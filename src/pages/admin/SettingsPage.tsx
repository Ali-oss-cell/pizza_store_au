import { AdminLayout } from '../../components/admin/AdminLayout'

export const SettingsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Store Settings</h1>
          <p className="text-gray-600 mt-1">Configure store-wide settings</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">Store settings page - Coming soon</p>
        </div>
      </div>
    </AdminLayout>
  )
}

