import { useQuery } from '@apollo/client/react'
import { Link } from 'react-router-dom'
import { AdminLayout } from '../components/admin/AdminLayout'
import { StatusBadge } from '../components/admin/StatusBadge'
import { DASHBOARD_QUERY } from '../graphql/queries'
import {
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
} from 'lucide-react'

export const AdminDashboardPage = () => {
  const { data, loading, error } = useQuery(DASHBOARD_QUERY, {
    fetchPolicy: 'network-only', // Always fetch fresh data
  })

  const stats = (data as any)?.orderStats || {}
  const recentOrders = (data as any)?.recentOrders || []

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    return 'Today'
  }

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders || 0,
      icon: ShoppingCart,
      color: 'blue',
      trend: '+12%',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue || 0),
      icon: DollarSign,
      color: 'green',
      trend: '+8%',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders || 0,
      icon: Clock,
      color: 'yellow',
      badge: 'pending',
    },
    {
      title: 'Preparing Orders',
      value: stats.preparingOrders || 0,
      icon: Package,
      color: 'purple',
      badge: 'preparing',
    },
    {
      title: 'Ready Orders',
      value: stats.readyOrders || 0,
      icon: CheckCircle,
      color: 'green',
      badge: 'ready',
    },
    {
      title: 'Completed Orders',
      value: stats.completedOrders || 0,
      icon: CheckCircle,
      color: 'dark-green',
      badge: 'completed',
    },
    {
      title: 'Cancelled Orders',
      value: stats.cancelledOrders || 0,
      icon: XCircle,
      color: 'red',
      badge: 'cancelled',
    },
    {
      title: "Today's Orders",
      value: stats.todayOrders || 0,
      icon: ShoppingCart,
      color: 'blue',
    },
    {
      title: "Today's Revenue",
      value: formatCurrency(stats.todayRevenue || 0),
      icon: DollarSign,
      color: 'green',
    },
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600',
      'dark-green': 'bg-green-200 text-green-700',
      red: 'bg-red-100 text-red-600',
    }
    return colors[color] || colors.blue
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your pizza store</p>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pizza-purple mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="text-red-800">Error loading dashboard: {error.message}</p>
            <p className="text-sm text-red-600 mt-2">
              Note: This is a mock implementation. Connect to your GraphQL backend to see real data.
            </p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {statCards.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(stat.color)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      {stat.trend && (
                        <div className="flex items-center gap-1 text-green-500">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm font-medium">{stat.trend}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    {stat.badge && (
                      <div className="mt-3">
                        <StatusBadge status={stat.badge} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <Link
                  to="/admin/orders"
                  className="text-sm text-pizza-purple hover:text-pizza-gold font-medium flex items-center gap-1"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Order #
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                          No recent orders
                        </td>
                      </tr>
                    ) : (
                      recentOrders.map((order: any) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link
                              to={`/admin/orders/${order.id}`}
                              className="text-sm font-medium text-pizza-purple hover:text-pizza-gold"
                            >
                              #{order.orderNumber}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">{order.customerName}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.orderType === 'delivery'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {order.orderTypeDisplay || order.orderType}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={order.status} display={order.statusDisplay} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-semibold text-gray-900">
                              ${parseFloat(order.total).toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-600">{getTimeAgo(order.createdAt)}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link
                              to={`/admin/orders/${order.id}`}
                              className="text-sm text-pizza-purple hover:text-pizza-gold font-medium"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/admin/orders"
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all text-left group"
              >
                <div className="w-12 h-12 bg-pizza-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-pizza-gold transition-colors">
                  <ShoppingCart className="w-6 h-6 text-pizza-purple" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">View All Orders</h3>
                <p className="text-sm text-gray-500">Manage and track all orders</p>
              </Link>

              <Link
                to="/admin/products/new"
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all text-left group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Add New Product</h3>
                <p className="text-sm text-gray-500">Create a new menu item</p>
              </Link>

              <Link
                to="/admin/settings"
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all text-left group"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                  <TrendingUp className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Store Settings</h3>
                <p className="text-sm text-gray-500">Configure store preferences</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
