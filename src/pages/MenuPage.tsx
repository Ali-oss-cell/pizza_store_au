import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { ShoppingCart, Filter, Star, Clock, Flame } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useToast } from '../contexts/ToastContext'

// Extended pizza menu data
const menuItems = [
  {
    id: 1,
    name: 'Mushroom Flex',
    category: 'Vegetarian',
    price: 14.99,
    rating: 4.8,
    prepTime: '15-20 min',
    description: 'Fresh mushrooms paired with herbs and melted mozzarella on our signature crust.',
    image: '/pizzas/main/mushroom-flex.jpg',
    tags: ['vegetarian', 'bestseller'],
    spicy: 0
  },
  {
    id: 2,
    name: 'Cheese Burst',
    category: 'Classic',
    price: 12.99,
    rating: 4.9,
    prepTime: '12-15 min',
    description: 'Extra mozzarella that stretches with every bite on a crispy golden crust.',
    image: '/pizzas/main/cheese-burst.jpg',
    tags: ['classic', 'bestseller'],
    spicy: 0
  },
  {
    id: 3,
    name: 'Pepperoni Heat',
    category: 'Spicy',
    price: 15.99,
    rating: 4.7,
    prepTime: '15-18 min',
    description: 'Loaded with spicy pepperoni slices and a kick of red pepper flakes.',
    image: '/pizzas/main/pepperoni-heat.jpg',
    tags: ['spicy', 'meat'],
    spicy: 3
  },
  {
    id: 4,
    name: 'Garden Fresh',
    category: 'Healthy',
    price: 13.99,
    rating: 4.6,
    prepTime: '15-20 min',
    description: 'A colorful medley of fresh vegetables including bell peppers, olives, and tomatoes.',
    image: '/pizzas/main/garden-fresh.jpg',
    tags: ['vegetarian', 'healthy'],
    spicy: 0
  },
  {
    id: 5,
    name: 'BBQ Chicken',
    category: 'Meat',
    price: 16.99,
    rating: 4.8,
    prepTime: '18-22 min',
    description: 'Tender grilled chicken with smoky BBQ sauce, red onions, and fresh cilantro.',
    image: '/pizzas/main/mushroom-flex.jpg',
    tags: ['meat', 'bestseller'],
    spicy: 1
  },
  {
    id: 6,
    name: 'Hawaiian Paradise',
    category: 'Classic',
    price: 14.49,
    rating: 4.5,
    prepTime: '15-18 min',
    description: 'Sweet pineapple chunks with savory ham on a bed of melted mozzarella.',
    image: '/pizzas/main/cheese-burst.jpg',
    tags: ['classic', 'sweet'],
    spicy: 0
  },
  {
    id: 7,
    name: 'Inferno Special',
    category: 'Spicy',
    price: 17.99,
    rating: 4.4,
    prepTime: '18-22 min',
    description: 'For the brave! Jalapeños, ghost pepper sauce, and spicy Italian sausage.',
    image: '/pizzas/main/pepperoni-heat.jpg',
    tags: ['spicy', 'extreme'],
    spicy: 5
  },
  {
    id: 8,
    name: 'Mediterranean Delight',
    category: 'Healthy',
    price: 15.49,
    rating: 4.7,
    prepTime: '15-20 min',
    description: 'Feta cheese, kalamata olives, sun-dried tomatoes, and fresh basil.',
    image: '/pizzas/main/garden-fresh.jpg',
    tags: ['vegetarian', 'healthy'],
    spicy: 0
  }
]

const categories = ['All', 'Classic', 'Vegetarian', 'Spicy', 'Meat', 'Healthy']

export const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const { addToCart, cartTotal, cartCount } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()

  // Filter items by category and search
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    const menuItem = menuItems.find(item => item.id === id)
    if (menuItem) {
      addToCart({
        id: menuItem.id,
        qty: 1,
        name: menuItem.name,
        price: menuItem.price,
        image: menuItem.image,
      })
      showToast(`${menuItem.name} added to cart!`, 'success')
    }
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
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-center">
            Our <span className="text-pizza-gold">Menu</span>
          </h1>
          <p className="text-gray-300 text-xl text-center max-w-2xl mx-auto">
            Handcrafted pizzas made with love and the finest ingredients
          </p>
        </div>
      </div>

      {/* Filter & Cart Bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-pizza-gold text-pizza-purple shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Cart Summary */}
            <Link 
              to="/cart"
              className="flex items-center gap-4 bg-pizza-gold/20 px-6 py-3 rounded-full hover:bg-pizza-gold/30 transition-colors"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-pizza-purple" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-pizza-gold text-pizza-purple text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-bold text-pizza-purple">${cartTotal.toFixed(2)}</span>
              {cartCount > 0 && (
                <span className="px-4 py-1 bg-pizza-gold text-pizza-purple rounded-full text-sm font-medium">
                  View Cart
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredItems.length > 0 ? (
                <>Found <span className="font-bold text-pizza-purple">{filteredItems.length}</span> {filteredItems.length === 1 ? 'result' : 'results'} for "<span className="font-semibold">{searchQuery}</span>"</>
              ) : (
                <>No results found for "<span className="font-semibold">{searchQuery}</span>"</>
              )}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = '/pizzas/main/mushroom-flex.jpg'
                  }}
                />
                {/* Tags */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {item.tags.includes('bestseller') && (
                    <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                      ⭐ Bestseller
                    </span>
                  )}
                  {item.spicy > 0 && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {item.spicy > 3 ? 'Extreme' : 'Spicy'}
                    </span>
                  )}
                </div>
                {/* Quick Add Button */}
                <button
                  onClick={(e) => handleAddToCart(e, item.id)}
                  className="absolute bottom-3 right-3 w-12 h-12 bg-pizza-gold text-pizza-purple rounded-full flex items-center justify-center shadow-lg transform translate-y-16 group-hover:translate-y-0 transition-all duration-300 hover:bg-pizza-gold/90 hover:scale-110 z-10"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs font-medium text-pizza-gold uppercase tracking-wide">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1 hover:text-pizza-purple transition-colors">{item.name}</h3>
                  </div>
                  <span className="text-2xl font-bold text-pizza-purple">${item.price}</span>
                </div>
                
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium text-gray-600">{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{item.prepTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No pizzas found in this category</p>
        </div>
      )}
    </div>
  )
}

