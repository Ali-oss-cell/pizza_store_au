import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Star, Clock, Flame, Plus, Minus, Heart } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useToast } from '../contexts/ToastContext'
import { WaveDivider } from '../components/WaveDivider'

// Menu items data (should come from API in production)
const menuItems = [
  {
    id: 1,
    name: 'Mushroom Flex',
    category: 'Vegetarian',
    price: 14.99,
    rating: 4.8,
    prepTime: '15-20 min',
    description: 'Fresh mushrooms paired with herbs and melted mozzarella on our signature crust. A vegetarian delight that brings earthy flavors and satisfying textures in every bite.',
    fullDescription: 'Our Mushroom Flex pizza is a celebration of earthy flavors. We use a blend of fresh cremini and portobello mushrooms, sautéed to perfection with garlic and herbs. Topped with our signature three-cheese blend and finished with fresh parsley, this pizza is a vegetarian masterpiece that even meat lovers will enjoy.',
    image: '/pizzas/main/mushroom-flex.jpg',
    tags: ['vegetarian', 'bestseller'],
    spicy: 0,
    ingredients: ['Mushrooms', 'Mozzarella', 'Parmesan', 'Garlic', 'Fresh Herbs', 'Olive Oil'],
    nutrition: {
      calories: 320,
      protein: '18g',
      carbs: '38g',
      fat: '12g',
    }
  },
  {
    id: 2,
    name: 'Cheese Burst',
    category: 'Classic',
    price: 12.99,
    rating: 4.9,
    prepTime: '12-15 min',
    description: 'Extra mozzarella that stretches with every bite on a crispy golden crust.',
    fullDescription: 'The ultimate cheese lover\'s dream! Our Cheese Burst pizza features a double layer of premium mozzarella that creates that perfect stretch with every bite. Baked to golden perfection on our hand-tossed crust, this classic never goes out of style.',
    image: '/pizzas/main/cheese-burst.jpg',
    tags: ['classic', 'bestseller'],
    spicy: 0,
    ingredients: ['Mozzarella', 'Cheddar', 'Parmesan', 'Oregano'],
    nutrition: {
      calories: 380,
      protein: '22g',
      carbs: '42g',
      fat: '16g',
    }
  },
  {
    id: 3,
    name: 'Pepperoni Heat',
    category: 'Spicy',
    price: 15.99,
    rating: 4.7,
    prepTime: '15-18 min',
    description: 'Loaded with spicy pepperoni slices and a kick of red pepper flakes.',
    fullDescription: 'For those who like it hot! Our Pepperoni Heat features premium spicy pepperoni, a generous sprinkle of red pepper flakes, and our signature spicy tomato sauce. Each bite delivers the perfect balance of heat and flavor.',
    image: '/pizzas/main/pepperoni-heat.jpg',
    tags: ['spicy', 'meat'],
    spicy: 3,
    ingredients: ['Spicy Pepperoni', 'Mozzarella', 'Red Pepper Flakes', 'Spicy Tomato Sauce'],
    nutrition: {
      calories: 420,
      protein: '24g',
      carbs: '40g',
      fat: '18g',
    }
  },
  {
    id: 4,
    name: 'Garden Fresh',
    category: 'Healthy',
    price: 13.99,
    rating: 4.6,
    prepTime: '15-20 min',
    description: 'A colorful medley of fresh vegetables including bell peppers, olives, and tomatoes.',
    fullDescription: 'A vibrant celebration of fresh vegetables! Our Garden Fresh pizza is loaded with colorful bell peppers, juicy cherry tomatoes, black olives, red onions, and fresh basil. Light, healthy, and bursting with natural flavors.',
    image: '/pizzas/main/garden-fresh.jpg',
    tags: ['vegetarian', 'healthy'],
    spicy: 0,
    ingredients: ['Bell Peppers', 'Cherry Tomatoes', 'Black Olives', 'Red Onions', 'Fresh Basil', 'Mozzarella'],
    nutrition: {
      calories: 280,
      protein: '14g',
      carbs: '35g',
      fat: '10g',
    }
  },
  {
    id: 5,
    name: 'BBQ Chicken',
    category: 'Meat',
    price: 16.99,
    rating: 4.8,
    prepTime: '18-22 min',
    description: 'Tender grilled chicken with smoky BBQ sauce, red onions, and fresh cilantro.',
    fullDescription: 'A mouthwatering combination of tender grilled chicken, smoky BBQ sauce, caramelized red onions, and fresh cilantro. This pizza brings the best of barbecue to your table.',
    image: '/pizzas/main/mushroom-flex.jpg',
    tags: ['meat', 'bestseller'],
    spicy: 1,
    ingredients: ['Grilled Chicken', 'BBQ Sauce', 'Red Onions', 'Cilantro', 'Mozzarella'],
    nutrition: {
      calories: 450,
      protein: '28g',
      carbs: '45g',
      fat: '16g',
    }
  },
  {
    id: 6,
    name: 'Hawaiian Paradise',
    category: 'Classic',
    price: 14.49,
    rating: 4.5,
    prepTime: '15-18 min',
    description: 'Sweet pineapple chunks with savory ham on a bed of melted mozzarella.',
    fullDescription: 'The perfect sweet and savory combination! Juicy pineapple chunks meet premium ham on a bed of melted mozzarella. A tropical paradise in every bite.',
    image: '/pizzas/main/cheese-burst.jpg',
    tags: ['classic', 'sweet'],
    spicy: 0,
    ingredients: ['Ham', 'Pineapple', 'Mozzarella', 'Tomato Sauce'],
    nutrition: {
      calories: 360,
      protein: '20g',
      carbs: '44g',
      fat: '14g',
    }
  },
  {
    id: 7,
    name: 'Inferno Special',
    category: 'Spicy',
    price: 17.99,
    rating: 4.4,
    prepTime: '18-22 min',
    description: 'For the brave! Jalapeños, ghost pepper sauce, and spicy Italian sausage.',
    fullDescription: 'Warning: Extreme heat! This pizza is not for the faint of heart. Featuring jalapeños, ghost pepper sauce, spicy Italian sausage, and habanero peppers. Only for true spice lovers!',
    image: '/pizzas/main/pepperoni-heat.jpg',
    tags: ['spicy', 'extreme'],
    spicy: 5,
    ingredients: ['Spicy Italian Sausage', 'Jalapeños', 'Ghost Pepper Sauce', 'Habanero Peppers', 'Mozzarella'],
    nutrition: {
      calories: 480,
      protein: '26g',
      carbs: '42g',
      fat: '20g',
    }
  },
  {
    id: 8,
    name: 'Mediterranean Delight',
    category: 'Healthy',
    price: 15.49,
    rating: 4.7,
    prepTime: '15-20 min',
    description: 'Feta cheese, kalamata olives, sun-dried tomatoes, and fresh basil.',
    fullDescription: 'A taste of the Mediterranean! Creamy feta cheese, briny kalamata olives, sun-dried tomatoes, fresh basil, and a drizzle of olive oil. Healthy, flavorful, and absolutely delicious.',
    image: '/pizzas/main/garden-fresh.jpg',
    tags: ['vegetarian', 'healthy'],
    spicy: 0,
    ingredients: ['Feta Cheese', 'Kalamata Olives', 'Sun-dried Tomatoes', 'Fresh Basil', 'Olive Oil', 'Mozzarella'],
    nutrition: {
      calories: 320,
      protein: '16g',
      carbs: '38g',
      fat: '14g',
    }
  },
]

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const product = menuItems.find(item => item.id === parseInt(id || '0'))

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The pizza you're looking for doesn't exist.</p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 bg-pizza-gold text-pizza-purple font-semibold rounded-full hover:bg-pizza-gold/90 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      qty: quantity,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    showToast(`${quantity} x ${product.name} added to cart!`, 'success')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-pizza-purple py-16 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-white hover:text-pizza-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {product.name}
          </h1>
          <p className="text-gray-300 text-lg">{product.category} Pizza</p>
        </div>
      </div>

      <WaveDivider position="top" color="#3a2c73" />

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/pizzas/main/mushroom-flex.jpg'
                }}
              />
              {/* Favorite Button */}
              <button
                onClick={() => {
                  setIsFavorite(!isFavorite)
                  showToast(isFavorite ? 'Removed from favorites' : 'Added to favorites', 'info')
                }}
                className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
              {/* Tags */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {product.tags.includes('bestseller') && (
                  <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full">
                    ⭐ Bestseller
                  </span>
                )}
                {product.spicy > 0 && (
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    {product.spicy > 3 ? 'Extreme Heat' : 'Spicy'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Price & Rating */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-4xl font-bold text-pizza-purple mb-2">${product.price}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-gray-900">{product.rating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{product.prepTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.fullDescription}</p>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutrition */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nutrition Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Calories</p>
                  <p className="text-2xl font-bold text-pizza-purple">{product.nutrition.calories}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Protein</p>
                  <p className="text-2xl font-bold text-pizza-purple">{product.nutrition.protein}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Carbs</p>
                  <p className="text-2xl font-bold text-pizza-purple">{product.nutrition.carbs}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fat</p>
                  <p className="text-2xl font-bold text-pizza-purple">{product.nutrition.fat}</p>
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-900">Quantity:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-xl font-bold text-pizza-purple ml-auto">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-pizza-gold text-pizza-purple py-4 px-6 rounded-xl font-bold text-lg hover:bg-pizza-gold/90 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

