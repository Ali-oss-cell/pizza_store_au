import { AdminLayout } from '../../components/admin/AdminLayout'

export const IngredientsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ingredients Management</h1>
          <p className="text-gray-600 mt-1">Manage base ingredients</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">Ingredients management page - Coming soon</p>
        </div>
      </div>
    </AdminLayout>
  )
}

