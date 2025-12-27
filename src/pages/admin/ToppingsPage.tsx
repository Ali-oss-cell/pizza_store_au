import { AdminLayout } from '../../components/admin/AdminLayout'

export const ToppingsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Toppings Management</h1>
          <p className="text-gray-600 mt-1">Manage extra toppings</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">Toppings management page - Coming soon</p>
        </div>
      </div>
    </AdminLayout>
  )
}

