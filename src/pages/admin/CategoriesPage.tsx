import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { useToast } from '../../contexts/ToastContext'
import { CATEGORIES_QUERY } from '../../graphql/queries'
import { CREATE_CATEGORY_MUTATION, UPDATE_CATEGORY_MUTATION, DELETE_CATEGORY_MUTATION } from '../../graphql/mutations'
import { Plus, Edit, Trash2, X, Save } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  description: string
  createdAt: string
  productCount?: number
}

interface CategoryFormData {
  name: string
  slug: string
  description: string
}

export const CategoriesPage = () => {
  const { showToast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
  })

  const { data, loading, error, refetch } = useQuery(CATEGORIES_QUERY)
  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION)
  const [updateCategory] = useMutation(UPDATE_CATEGORY_MUTATION)
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION)

  const categories = (data as any)?.allCategories || []

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleInputChange = (field: keyof CategoryFormData, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value }
      // Auto-generate slug when name changes
      if (field === 'name' && !editingCategory) {
        updated.slug = generateSlug(value)
      }
      return updated
    })
  }

  const openCreateModal = () => {
    setEditingCategory(null)
    setFormData({ name: '', slug: '', description: '' })
    setIsModalOpen(true)
  }

  const openEditModal = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingCategory(null)
    setFormData({ name: '', slug: '', description: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      showToast('Category name is required', 'error')
      return
    }

    try {
      const input = {
        name: formData.name.trim(),
        slug: formData.slug.trim() || generateSlug(formData.name),
        description: formData.description.trim() || null,
      }

      if (editingCategory) {
        const { data: updateData } = await updateCategory({
          variables: { id: editingCategory.id, input },
        })
        const response = updateData as any
        if (response?.updateCategory?.success) {
          showToast('Category updated successfully!', 'success')
          refetch()
          closeModal()
        } else {
          showToast(response?.updateCategory?.message || 'Failed to update category', 'error')
        }
      } else {
        const { data: createData } = await createCategory({
          variables: { input },
        })
        const response = createData as any
        if (response?.createCategory?.success) {
          showToast('Category created successfully!', 'success')
          refetch()
          closeModal()
        } else {
          showToast(response?.createCategory?.message || 'Failed to create category', 'error')
        }
      }
    } catch (error: any) {
      console.error('Error saving category:', error)
      showToast(error.message || 'An error occurred while saving the category', 'error')
    }
  }

  const handleDelete = async (category: Category) => {
    if (!window.confirm(`Are you sure you want to delete "${category.name}"? This action cannot be undone.`)) {
      return
    }

    try {
      const { data: deleteData } = await deleteCategory({
        variables: { id: category.id },
      })
      const response = deleteData as any
      if (response?.deleteCategory?.success) {
        showToast('Category deleted successfully!', 'success')
        refetch()
      } else {
        showToast(response?.deleteCategory?.message || 'Failed to delete category', 'error')
      }
    } catch (error: any) {
      console.error('Error deleting category:', error)
      showToast(error.message || 'An error occurred while deleting the category', 'error')
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
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
          <p className="text-red-800">Error loading categories: {error.message}</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
            <p className="text-gray-600 mt-1">Manage product categories</p>
          </div>
          <button
            onClick={openCreateModal}
            className="px-6 py-3 bg-pizza-gold text-pizza-purple font-semibold rounded-lg hover:bg-pizza-gold/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Category
          </button>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No categories found. Create your first category!
                    </td>
                  </tr>
                ) : (
                  categories.map((category: Category) => (
                    <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{category.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-mono">
                          {category.slug}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-md truncate">
                          {category.description || <span className="text-gray-400 italic">No description</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{formatDate(category.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(category)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(category)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingCategory ? 'Edit Category' : 'Create New Category'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none"
                    placeholder="e.g., Pizza, Pasta, Drinks"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug
                    <span className="text-xs text-gray-500 ml-2">(Auto-generated from name)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none font-mono text-sm"
                    placeholder="e.g., pizza, pasta, drinks"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL-friendly identifier (auto-generated if left empty)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none"
                    placeholder="Optional description for this category"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-pizza-gold text-pizza-purple font-semibold rounded-lg hover:bg-pizza-gold/90 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editingCategory ? 'Update Category' : 'Create Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

