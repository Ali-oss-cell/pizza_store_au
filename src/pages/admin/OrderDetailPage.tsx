import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client/react'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { StatusBadge } from '../../components/admin/StatusBadge'
import { ORDER_DETAIL_QUERY } from '../../graphql/queries'
import { UPDATE_ORDER_STATUS_MUTATION } from '../../graphql/mutations'
import { ArrowLeft, Printer, Save } from 'lucide-react'
import { useToast } from '../../contexts/ToastContext'

export const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { showToast } = useToast()
  const [status, setStatus] = useState('')

  const { data, loading, error } = useQuery(ORDER_DETAIL_QUERY, {
    variables: { id },
  })

  // Set status when data loads
  useEffect(() => {
    const orderData = (data as any)?.order
    if (orderData && orderData.status) {
      setStatus(orderData.status)
    }
  }, [data])

  const [updateStatus, { loading: updating }] = useMutation(UPDATE_ORDER_STATUS_MUTATION, {
    refetchQueries: [{ query: ORDER_DETAIL_QUERY, variables: { id } }],
    onCompleted: () => {
      showToast('Order status updated successfully', 'success')
    },
    onError: (error: any) => {
      showToast(`Error: ${error.message}`, 'error')
    },
  })

  const order = (data as any)?.order

  const handleStatusUpdate = () => {
    updateStatus({
      variables: {
        input: {
          orderId: id,
          status: status,
        },
      },
    })
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pizza-purple"></div>
        </div>
      </AdminLayout>
    )
  }

  if (error || !order) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-800">Error loading order: {error?.message || 'Order not found'}</p>
          <Link to="/admin/orders" className="text-pizza-purple hover:text-pizza-gold mt-4 inline-block">
            ← Back to Orders
          </Link>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/orders"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order #{order.orderNumber}</h1>
              <p className="text-gray-600 mt-1">Order Details</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <StatusBadge status={order.status} display={order.statusDisplay} />
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.orderType === 'delivery'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {order.orderTypeDisplay || order.orderType}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div><strong>Created:</strong> {formatDate(order.createdAt)}</div>
                    {order.updatedAt && <div><strong>Updated:</strong> {formatDate(order.updatedAt)}</div>}
                    {order.completedAt && <div><strong>Completed:</strong> {formatDate(order.completedAt)}</div>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="delivered">Delivered</option>
                    <option value="picked_up">Picked Up</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={updating || status === order.status}
                    className="px-4 py-2 bg-pizza-gold text-pizza-purple font-semibold rounded-lg hover:bg-pizza-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Update
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Information</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Name:</span>
                  <p className="font-medium text-gray-900">{order.customerName}</p>
                </div>
                {order.customerEmail && (
                  <div>
                    <span className="text-sm text-gray-600">Email:</span>
                    <p className="font-medium text-gray-900">{order.customerEmail}</p>
                  </div>
                )}
                {order.customerPhone && (
                  <div>
                    <span className="text-sm text-gray-600">Phone:</span>
                    <p className="font-medium text-gray-900">{order.customerPhone}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Item</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Details</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Qty</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.items?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{item.productName}</div>
                          {item.isCombo && (
                            <span className="text-xs text-pizza-gold">Combo</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {item.sizeName && <div>Size: {item.sizeName}</div>}
                          {item.selectedToppings && item.selectedToppings.length > 0 && (
                            <div>Toppings: {item.selectedToppings.join(', ')}</div>
                          )}
                          {item.includedItems && item.includedItems.length > 0 && (
                            <div>Includes: {item.includedItems.join(', ')}</div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-3 text-gray-900">${parseFloat(item.unitPrice).toFixed(2)}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900">
                          ${parseFloat(item.subtotal).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Delivery Information */}
            {order.orderType === 'delivery' && order.deliveryAddress && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Information</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Address:</span>
                    <p className="font-medium text-gray-900">{order.deliveryAddress}</p>
                  </div>
                  {order.deliveryInstructions && (
                    <div>
                      <span className="text-sm text-gray-600">Instructions:</span>
                      <p className="font-medium text-gray-900">{order.deliveryInstructions}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Order Notes */}
            {order.orderNotes && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Notes</h2>
                <p className="text-gray-700">{order.orderNotes}</p>
              </div>
            )}
          </div>

          {/* Sidebar - Pricing */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${parseFloat(order.subtotal || 0).toFixed(2)}</span>
                </div>
                {order.deliveryFee > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">${parseFloat(order.deliveryFee).toFixed(2)}</span>
                  </div>
                )}
                {order.discountCode && (
                  <>
                    <div className="flex justify-between text-gray-600">
                      <span>Discount ({order.discountCode})</span>
                      <span className="font-semibold text-green-600">
                        -${parseFloat(order.discountAmount || 0).toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-bold text-pizza-purple">
                      ${parseFloat(order.total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <Printer className="w-5 h-5" />
                Print Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

