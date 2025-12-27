import { useParams, Link } from 'react-router-dom'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { ArrowLeft } from 'lucide-react'

export const ProductEditorPage = () => {
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id

  return (
    <AdminLayout>
      <div className="space-y-6">
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">Product editor page - Coming soon</p>
        </div>
      </div>
    </AdminLayout>
  )
}

