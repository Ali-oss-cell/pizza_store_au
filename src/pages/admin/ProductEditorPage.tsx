import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client/react'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { useToast } from '../../contexts/ToastContext'
import { PRODUCT_EDITOR_QUERY } from '../../graphql/queries'
import { CREATE_PRODUCT_MUTATION, UPDATE_PRODUCT_MUTATION, DELETE_PRODUCT_MUTATION } from '../../graphql/mutations'
import { ArrowLeft, Save, Trash2, Upload, Star } from 'lucide-react'

interface ProductFormData {
  name: string
  shortDescription: string
  description: string
  basePrice: string
  categoryId: string
  tagIds: string[]
  ingredientIds: string[]
  sizeIds: string[]
  toppingIds: string[]
  includedItemIds: string[]
  isAvailable: boolean
  isFeatured: boolean
  isCombo: boolean
  prepTimeMin: string
  prepTimeMax: string
  calories: string
  imageUrl: string
}

export const ProductEditorPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const isEdit = !!id

  // Form state
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    shortDescription: '',
    description: '',
    basePrice: '0',
    categoryId: '',
    tagIds: [],
    ingredientIds: [],
    sizeIds: [],
    toppingIds: [],
    includedItemIds: [],
    isAvailable: true,
    isFeatured: false,
    isCombo: false,
    prepTimeMin: '',
    prepTimeMax: '',
    calories: '',
    imageUrl: '',
  })

  const [imagePreview, setImagePreview] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Type definitions for GraphQL responses
  interface ProductEditorData {
    product?: any
    allCategories: any[]
    allTags: any[]
    allIngredients: any[]
    allSizes: any[]
    allToppings: any[]
    allIncludedItems: any[]
  }

  interface MutationResponse {
    createProduct?: { success: boolean; message?: string }
    updateProduct?: { success: boolean; message?: string }
    deleteProduct?: { success: boolean; message?: string }
  }

  // Load product data if editing
  const { data, loading, error } = useQuery<ProductEditorData>(PRODUCT_EDITOR_QUERY, {
    variables: { id },
    skip: !isEdit,
  })

  // Mutations
  const [createProduct] = useMutation<MutationResponse>(CREATE_PRODUCT_MUTATION)
  const [updateProduct] = useMutation<MutationResponse>(UPDATE_PRODUCT_MUTATION)
  const [deleteProduct] = useMutation<MutationResponse>(DELETE_PRODUCT_MUTATION)

  // Populate form when product data loads
  useEffect(() => {
    if (data?.product) {
      const product = data.product
      setFormData({
        name: product.name || '',
        shortDescription: product.shortDescription || '',
        description: product.description || '',
        basePrice: product.basePrice?.toString() || '0',
        categoryId: product.category?.id || '',
        tagIds: product.tags?.map((t: any) => t.id) || [],
        ingredientIds: product.ingredients?.map((i: any) => i.id) || [],
        sizeIds: product.availableSizes?.map((s: any) => s.id) || [],
        toppingIds: product.availableToppings?.map((t: any) => t.id) || [],
        includedItemIds: product.includedItems?.map((i: any) => i.id) || [],
        isAvailable: product.isAvailable ?? true,
        isFeatured: product.isFeatured ?? false,
        isCombo: product.isCombo ?? false,
        prepTimeMin: product.prepTimeMin?.toString() || '',
        prepTimeMax: product.prepTimeMax?.toString() || '',
        calories: product.calories?.toString() || '',
        imageUrl: product.imageUrl || '',
      })
      setImagePreview(product.imageUrl || '')
    }
  }, [data])

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleMultiSelect = (field: 'tagIds' | 'ingredientIds' | 'sizeIds' | 'toppingIds' | 'includedItemIds', id: string) => {
    setFormData(prev => {
      const currentIds = prev[field]
      const newIds = currentIds.includes(id)
        ? currentIds.filter((itemId: string) => itemId !== id)
        : [...currentIds, id]
      return { ...prev, [field]: newIds }
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // For now, just set the URL. In production, you'd upload to a server
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        handleInputChange('imageUrl', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const input = {
        name: formData.name,
        shortDescription: formData.shortDescription,
        description: formData.description,
        basePrice: parseFloat(formData.basePrice),
        categoryId: formData.categoryId,
        tagIds: formData.tagIds,
        ingredientIds: formData.ingredientIds,
        sizeIds: formData.sizeIds,
        toppingIds: formData.toppingIds,
        includedItemIds: formData.isCombo ? formData.includedItemIds : [],
        isAvailable: formData.isAvailable,
        isFeatured: formData.isFeatured,
        isCombo: formData.isCombo,
        prepTimeMin: formData.prepTimeMin ? parseInt(formData.prepTimeMin) : null,
        prepTimeMax: formData.prepTimeMax ? parseInt(formData.prepTimeMax) : null,
        calories: formData.calories ? parseInt(formData.calories) : null,
        imageUrl: formData.imageUrl,
      }

      if (isEdit) {
        const { data: updateData } = await updateProduct({
          variables: { id, input },
        })
        const response = updateData as MutationResponse | undefined
        if (response?.updateProduct?.success) {
          showToast('Product updated successfully!', 'success')
          navigate('/admin/products')
        } else {
          showToast(response?.updateProduct?.message || 'Failed to update product', 'error')
        }
      } else {
        const { data: createData } = await createProduct({
          variables: { input },
        })
        const response = createData as MutationResponse | undefined
        if (response?.createProduct?.success) {
          showToast('Product created successfully!', 'success')
          navigate('/admin/products')
        } else {
          showToast(response?.createProduct?.message || 'Failed to create product', 'error')
        }
      }
    } catch (error: any) {
      console.error('Error saving product:', error)
      showToast(error.message || 'An error occurred while saving the product', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!isEdit || !window.confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      const { data: deleteData } = await deleteProduct({
        variables: { id },
      })
      const response = deleteData as MutationResponse | undefined
      if (response?.deleteProduct?.success) {
        showToast('Product deleted successfully!', 'success')
        navigate('/admin/products')
      } else {
        showToast(response?.deleteProduct?.message || 'Failed to delete product', 'error')
      }
    } catch (error: any) {
      console.error('Error deleting product:', error)
      showToast(error.message || 'An error occurred while deleting the product', 'error')
    }
  }

  const editorData = data as ProductEditorData | undefined
  const allCategories = editorData?.allCategories || []
  const allTags = editorData?.allTags || []
  const allIngredients = editorData?.allIngredients || []
  const allSizes = editorData?.allSizes || []
  const allToppings = editorData?.allToppings || []
  const allIncludedItems = editorData?.allIncludedItems || []
  const product = editorData?.product

  // Calculate price for each size
  const getSizePrice = (size: any) => {
    const basePrice = parseFloat(formData.basePrice) || 0
    const modifier = parseFloat(size.priceModifier) || 0
    return (basePrice + modifier).toFixed(2)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pizza-purple"></div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-800">Error loading product: {error.message}</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/products"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEdit ? 'Edit Product' : 'Create New Product'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isEdit ? 'Update product details' : 'Add a new product to your menu'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-pizza-gold text-pizza-purple font-semibold rounded-lg hover:bg-pizza-gold/90 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </div>

        {/* Section 1: Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none"
                placeholder="e.g., Margherita Pizza"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description <span className="text-red-500">*</span>
                <span className="text-xs text-gray-500 ml-2">(Max 255 characters)</span>
              </label>
              <input
                type="text"
                required
                maxLength={255}
                value={formData.shortDescription}
                onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none"
                placeholder="Brief description for menu display"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.shortDescription.length}/255</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none"
                placeholder="Detailed product description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => handleInputChange('categoryId', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none"
              >
                <option value="">Select a category</option>
                {allCategories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                value={formData.basePrice}
                onChange={(e) => handleInputChange('basePrice', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none"
                placeholder="0.00"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => {
                      handleInputChange('imageUrl', e.target.value)
                      setImagePreview(e.target.value)
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none"
                    placeholder="Image URL or upload file"
                  />
                </div>
                <label className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                    onError={() => setImagePreview('')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Classification */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Classification</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Tags</label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag: any) => (
                  <label
                    key={tag.id}
                    className={`px-4 py-2 rounded-lg cursor-pointer transition-colors border-2 ${
                      formData.tagIds.includes(tag.id)
                        ? 'bg-pizza-gold text-pizza-purple border-pizza-gold'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-pizza-gold'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.tagIds.includes(tag.id)}
                      onChange={() => handleMultiSelect('tagIds', tag.id)}
                      className="hidden"
                    />
                    <span className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: tag.color || '#gray' }}
                      />
                      {tag.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                  className="w-5 h-5 text-pizza-gold rounded focus:ring-pizza-gold"
                />
                <span className="text-sm font-medium text-gray-700">Featured Product</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) => handleInputChange('isAvailable', e.target.checked)}
                  className="w-5 h-5 text-pizza-gold rounded focus:ring-pizza-gold"
                />
                <span className="text-sm font-medium text-gray-700">Available</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isCombo}
                  onChange={(e) => handleInputChange('isCombo', e.target.checked)}
                  className="w-5 h-5 text-pizza-gold rounded focus:ring-pizza-gold"
                />
                <span className="text-sm font-medium text-gray-700">Is Combo</span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 3: Ingredients */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Ingredients</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allIngredients.map((ingredient: any) => (
              <label
                key={ingredient.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors border-2 ${
                  formData.ingredientIds.includes(ingredient.id)
                    ? 'bg-pizza-gold/20 border-pizza-gold'
                    : 'bg-gray-50 border-gray-200 hover:border-pizza-gold'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.ingredientIds.includes(ingredient.id)}
                  onChange={() => handleMultiSelect('ingredientIds', ingredient.id)}
                  className="hidden"
                />
                <div className="text-center">
                  {ingredient.icon && (
                    <div className="text-2xl mb-1">{ingredient.icon}</div>
                  )}
                  <div className="text-sm font-medium text-gray-700">{ingredient.name}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Section 4: Sizes & Pricing */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Sizes & Pricing</h2>
          <div className="space-y-3">
            {allSizes.map((size: any) => (
              <label
                key={size.id}
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors border-2 ${
                  formData.sizeIds.includes(size.id)
                    ? 'bg-pizza-gold/20 border-pizza-gold'
                    : 'bg-gray-50 border-gray-200 hover:border-pizza-gold'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.sizeIds.includes(size.id)}
                    onChange={() => handleMultiSelect('sizeIds', size.id)}
                    className="w-5 h-5 text-pizza-gold rounded focus:ring-pizza-gold"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{size.name}</div>
                    <div className="text-xs text-gray-500">{size.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    ${getSizePrice(size)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {size.priceModifier >= 0 ? '+' : ''}${parseFloat(size.priceModifier).toFixed(2)}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Section 5: Customization Options (Toppings) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Available Toppings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {allToppings.map((topping: any) => (
              <label
                key={topping.id}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors border-2 ${
                  formData.toppingIds.includes(topping.id)
                    ? 'bg-pizza-gold/20 border-pizza-gold'
                    : 'bg-gray-50 border-gray-200 hover:border-pizza-gold'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.toppingIds.includes(topping.id)}
                    onChange={() => handleMultiSelect('toppingIds', topping.id)}
                    className="w-5 h-5 text-pizza-gold rounded focus:ring-pizza-gold"
                  />
                  <span className="font-medium text-gray-700">{topping.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  +${parseFloat(topping.price || 0).toFixed(2)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Section 6: Combo Items (only if isCombo) */}
        {formData.isCombo && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Included Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {allIncludedItems.map((item: any) => (
                <label
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors border-2 ${
                    formData.includedItemIds.includes(item.id)
                      ? 'bg-pizza-gold/20 border-pizza-gold'
                      : 'bg-gray-50 border-gray-200 hover:border-pizza-gold'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.includedItemIds.includes(item.id)}
                    onChange={() => handleMultiSelect('includedItemIds', item.id)}
                    className="w-5 h-5 text-pizza-gold rounded focus:ring-pizza-gold"
                  />
                  <span className="font-medium text-gray-700">{item.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Section 7: Additional Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Additional Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prep Time Min (minutes)
              </label>
              <input
                type="number"
                min="0"
                value={formData.prepTimeMin}
                onChange={(e) => handleInputChange('prepTimeMin', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none"
                placeholder="15"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prep Time Max (minutes)
              </label>
              <input
                type="number"
                min="0"
                value={formData.prepTimeMax}
                onChange={(e) => handleInputChange('prepTimeMax', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none"
                placeholder="20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calories (optional)
              </label>
              <input
                type="number"
                min="0"
                value={formData.calories}
                onChange={(e) => handleInputChange('calories', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none"
                placeholder="250"
              />
            </div>
          </div>
        </div>

        {/* Section 8: Reviews (only if editing) */}
        {isEdit && product && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                <span className="text-2xl font-bold text-gray-900">
                  {product.averageRating != null && typeof product.averageRating === 'number'
                    ? product.averageRating.toFixed(1)
                    : 'N/A'}
                </span>
              </div>
              <div className="text-gray-600">
                ({product.ratingCount || 0} reviews)
              </div>
              <Link
                to={`/admin/reviews?productId=${id}`}
                className="ml-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
              >
                Manage Reviews
              </Link>
            </div>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-3 pb-6">
          <Link
            to="/admin/products"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-pizza-gold text-pizza-purple font-semibold rounded-lg hover:bg-pizza-gold/90 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </AdminLayout>
  )
}

