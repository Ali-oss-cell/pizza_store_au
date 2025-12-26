import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useToast } from '../contexts/ToastContext'
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CreditCard } from 'lucide-react'
import { WaveDivider } from '../components/WaveDivider'

// Menu items data (should come from API in production)
const menuItems = [
  {
    id: 1,
    name: 'Mushroom Flex',
    category: 'Vegetarian',
    price: 14.99,
    image: '/pizzas/main/mushroom-flex.jpg',
  },
  {
    id: 2,
    name: 'Cheese Burst',
    category: 'Classic',
    price: 12.99,
    image: '/pizzas/main/cheese-burst.jpg',
  },
  {
    id: 3,
    name: 'Pepperoni Heat',
    category: 'Spicy',
    price: 15.99,
    image: '/pizzas/main/pepperoni-heat.jpg',
  },
  {
    id: 4,
    name: 'Garden Fresh',
    category: 'Healthy',
    price: 13.99,
    image: '/pizzas/main/garden-fresh.jpg',
  },
  {
    id: 5,
    name: 'BBQ Chicken',
    category: 'Meat',
    price: 16.99,
    image: '/pizzas/main/mushroom-flex.jpg',
  },
  {
    id: 6,
    name: 'Hawaiian Paradise',
    category: 'Classic',
    price: 14.49,
    image: '/pizzas/main/cheese-burst.jpg',
  },
  {
    id: 7,
    name: 'Inferno Special',
    category: 'Spicy',
    price: 17.99,
    image: '/pizzas/main/pepperoni-heat.jpg',
  },
  {
    id: 8,
    name: 'Mediterranean Delight',
    category: 'Healthy',
    price: 15.49,
    image: '/pizzas/main/garden-fresh.jpg',
  },
]

export const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useCart()
  const { showToast } = useToast()

  const getItemDetails = (id: number) => {
    return menuItems.find(item => item.id === id)
  }

  const subtotal = cartTotal
  const tax = subtotal * 0.08 // 8% tax
  const deliveryFee = cartCount > 0 ? 2.99 : 0
  const total = subtotal + tax + deliveryFee

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Hero Banner */}
        <div className="relative bg-pizza-purple py-20 px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Your <span className="text-pizza-gold">Cart</span>
            </h1>
          </div>
        </div>

        <WaveDivider position="top" color="#3a2c73" />

        {/* Empty Cart */}
        <div className="max-w-4xl mx-auto px-8 py-20 text-center">
          <div className="bg-white rounded-3xl shadow-lg p-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-pizza-gold text-pizza-purple font-semibold rounded-full hover:bg-pizza-gold/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Banner */}
      <div className="relative bg-pizza-purple py-20 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Your <span className="text-pizza-gold">Cart</span>
          </h1>
          <p className="text-gray-300 text-xl">
            {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      <WaveDivider position="top" color="#3a2c73" />

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Cart Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Cart Items</h2>
              <button
                onClick={() => {
                  clearCart()
                  showToast('Cart cleared', 'info')
                }}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear Cart
              </button>
            </div>

            {/* Cart Items List */}
            {cart.map((item) => {
              const details = getItemDetails(item.id)
              if (!details) return null

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={details.image}
                        alt={details.name}
                        className="w-24 h-24 object-cover rounded-xl"
                        onError={(e) => {
                          e.currentTarget.src = '/pizzas/main/mushroom-flex.jpg'
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{details.name}</h3>
                          <p className="text-sm text-gray-500">{details.category}</p>
                          {item.customPizza && (
                            <div className="mt-2 text-xs text-gray-400">
                              <p>Custom Pizza</p>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              updateQuantity(item.id, item.qty - 1)
                              if (item.qty > 1) {
                                showToast(`Quantity updated`, 'info', 2000)
                              }
                            }}
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-5 h-5" />
                          </button>
                          <span className="text-lg font-bold w-8 text-center">{item.qty}</span>
                          <button
                            onClick={() => {
                              updateQuantity(item.id, item.qty + 1)
                              showToast(`Quantity updated`, 'info', 2000)
                            }}
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-pizza-purple">
                            ${(details.price * item.qty).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">${details.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Continue Shopping */}
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-pizza-purple hover:text-pizza-gold transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-bold text-pizza-purple">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-pizza-gold text-pizza-purple py-4 px-6 rounded-xl font-bold text-lg hover:bg-pizza-gold/90 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                <CreditCard className="w-6 h-6" />
                Proceed to Checkout
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

