import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { Link } from 'react-router-dom'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { PRODUCTS_QUERY } from '../../graphql/queries'
import { Search, Plus, Edit, Trash2, Star } from 'lucide-react'

export const ProductsPage = () => {
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [availabilityFilter, setAvailabilityFilter] = useState('all')
  const [featuredFilter, setFeaturedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const { data, loading, error } = useQuery(PRODUCTS_QUERY)

  const products = (data as any)?.allProducts || []
  const categories = (data as any)?.allCategories || []

  const filteredProducts = products.filter((product: any) => {
    const matchesCategory = categoryFilter === 'all' || product.category?.id === categoryFilter
    const matchesAvailability = 
      availabilityFilter === 'all' ||
      (availabilityFilter === 'available' && product.isAvailable) ||
      (availabilityFilter === 'unavailable' && !product.isAvailable)
    const matchesFeatured =
      featuredFilter === 'all' ||
      (featuredFilter === 'featured' && product.isFeatured) ||
      (featuredFilter === 'not-featured' && !product.isFeatured)
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesAvailability && matchesFeatured && matchesSearch
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
            <p className="text-gray-600 mt-1">Manage your menu items</p>
          </div>
          <Link
            to="/admin/products/new"
            className="px-6 py-3 bg-pizza-gold text-pizza-purple font-semibold rounded-lg hover:bg-pizza-gold/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            {/* Availability Filter */}
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none appearance-none bg-white"
            >
              <option value="all">All Availability</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>

            {/* Featured Filter */}
            <select
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none appearance-none bg-white"
            >
              <option value="all">All Products</option>
              <option value="featured">Featured</option>
              <option value="not-featured">Not Featured</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pizza-purple mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="text-red-800">Error loading products: {error.message}</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Prep Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                        No products found
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product: any) => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={product.imageUrl || '/pizzas/main/mushroom-flex.jpg'}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.src = '/pizzas/main/mushroom-flex.jpg'
                            }}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            to={`/admin/products/${product.id}/edit`}
                            className="font-medium text-pizza-purple hover:text-pizza-gold"
                          >
                            {product.name}
                          </Link>
                          {product.isFeatured && (
                            <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                              Featured
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{product.category?.name || 'N/A'}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900">
                            ${product.basePrice != null 
                              ? parseFloat(String(product.basePrice)).toFixed(2) 
                              : '0.00'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm text-gray-600">
                              {product.averageRating != null && typeof product.averageRating === 'number' 
                                ? product.averageRating.toFixed(1) 
                                : 'N/A'}
                            </span>
                            {product.ratingCount > 0 && (
                              <span className="text-xs text-gray-400">
                                ({product.ratingCount})
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{product.prepTimeDisplay || 'N/A'}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge
                            status={product.isAvailable ? 'available' : 'unavailable'}
                            display={product.isAvailable ? 'Available' : 'Unavailable'}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/admin/products/${product.id}/edit`}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
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
        )}
      </div>
    </AdminLayout>
  )
}

