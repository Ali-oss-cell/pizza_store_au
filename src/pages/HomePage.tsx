import { useState, useEffect } from 'react'
import { WaveDivider } from '../components/WaveDivider'
import { Link } from 'react-router-dom'

// Pizza data - all descriptions are the same length for consistent layout
const pizzas = [
  {
    id: 1,
    name: 'Mushroom Flex',
    category: 'Vegetarian',
    description: 'Fresh mushrooms paired with herbs and melted mozzarella on our signature crust. A vegetarian delight that brings earthy flavors and satisfying textures in every bite.',
    image: '/pizzas/main/mushroom-flex.jpg',
    thumbnail: '/pizzas/thumbnails/mushroom-flex-thumb.jpg'
  },
  {
    id: 2,
    name: 'Cheese Burst',
    category: 'Classic',
    description: 'Extra mozzarella that stretches with every bite on a crispy golden crust. Our signature cheese blend melted to perfection, making every slice an unforgettable cheesy experience.',
    image: '/pizzas/main/cheese-burst.jpg',
    thumbnail: '/pizzas/thumbnails/cheese-burst-thumb.jpg'
  },
  {
    id: 3,
    name: 'Pepperoni Heat',
    category: 'Spicy',
    description: 'Loaded with spicy pepperoni slices and a kick of red pepper flakes. This pizza brings the heat with every bite, balanced perfectly with our signature tomato sauce.',
    image: '/pizzas/main/pepperoni-heat.jpg',
    thumbnail: '/pizzas/thumbnails/pepperoni-heat-thumb.jpg'
  },
  {
    id: 4,
    name: 'Garden Fresh',
    category: 'Healthy',
    description: 'A colorful medley of fresh vegetables including bell peppers, olives, and tomatoes. Light, healthy, and bursting with natural flavors on our thin and crispy crust.',
    image: '/pizzas/main/garden-fresh.jpg',
    thumbnail: '/pizzas/thumbnails/garden-fresh-thumb.jpg'
  }
]

export const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [exitDirection, setExitDirection] = useState<'up' | 'down'>('up')
  const [isInitialMount, setIsInitialMount] = useState(true)
  const [textKey, setTextKey] = useState(0)

  // Mark initial mount as complete after first render
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialMount(false), 100)
    return () => clearTimeout(timer)
  }, [])

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && !isInitialMount) {
        setExitDirection('up')
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % pizzas.length)
          setTextKey(prev => prev + 1)
          setIsAnimating(false)
        }, 800)
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [isAnimating, isInitialMount])

  const handlePizzaClick = (index: number) => {
    if (index !== currentIndex && !isAnimating) {
      setExitDirection(index > currentIndex ? 'up' : 'down')
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex(index)
        setTextKey(prev => prev + 1)
        setIsAnimating(false)
      }, 800)
    }
  }

  const currentPizza = pizzas[currentIndex]

  return (
    <>
      {/* Hero Section with slightly darker background */}
      <section className="relative py-16 px-8 min-h-[700px] flex items-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
        {/* Curved Background Shape */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-bl from-gray-200/80 to-gray-100/60 rounded-tl-[120px] rounded-bl-[120px] -z-10"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] -z-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, gray 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content with popup animations */}
            <div className="space-y-6">
              <h2 
                className="text-2xl font-semibold text-gray-700 animate-text-popup"
                style={{ animationDelay: '0ms' }}
              >
                Today's Specials
              </h2>
              <h3 
                key={`category-${textKey}`}
                className="text-4xl font-bold text-pizza-orange text-glow-orange animate-text-popup"
                style={{ animationDelay: '100ms' }}
              >
                {currentPizza.category}
              </h3>
              <h1 
                key={`name-${textKey}`}
                className="text-6xl lg:text-7xl font-bold text-gray-900 animate-text-popup"
                style={{ animationDelay: '200ms' }}
              >
                {currentPizza.name}
              </h1>
              <p 
                key={`desc-${textKey}`}
                className="text-lg text-gray-600 leading-relaxed max-w-lg animate-text-popup"
                style={{ animationDelay: '300ms' }}
              >
                {currentPizza.description}
              </p>

              {/* Dots indicator and CTA */}
              <div className="flex items-center gap-6 pt-6 animate-text-popup" style={{ animationDelay: '400ms' }}>
                <div className="flex items-center gap-3">
                  {pizzas.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePizzaClick(index)}
                      className={`transition-all duration-500 rounded-full ${
                        currentIndex === index 
                          ? 'w-10 h-3 bg-pizza-orange' 
                          : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to pizza ${index + 1}`}
                    />
                  ))}
                </div>
                <Link 
                  to="/menu" 
                  className="ml-4 px-8 py-3 bg-pizza-orange text-white font-semibold rounded-full hover:bg-pizza-red transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  View Menu
                </Link>
              </div>
            </div>

            {/* Right Side - Pizza Carousel */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-2xl lg:max-w-3xl h-[500px] lg:h-[600px] perspective-1000 overflow-visible">
                {/* Pizza Container with smooth animation */}
                <div 
                  key={currentPizza.id}
                  className={`absolute inset-0 ${
                    isInitialMount 
                      ? 'animate-pizza-initial' 
                      : isAnimating 
                        ? exitDirection === 'up'
                          ? 'animate-pizza-exit-up'
                          : 'animate-pizza-exit-down'
                        : 'animate-pizza-enter'
                  }`}
                  style={{ 
                    zIndex: isAnimating ? 10 : 20
                  }}
                >
                  {/* Pizza Image */}
                  <div className="relative h-full w-full flex items-center justify-center">
                    <img 
                      src={currentPizza.image} 
                      alt={currentPizza.name}
                      className="w-full h-full object-contain z-10 relative drop-shadow-2xl"
                      style={{ 
                        display: 'block', 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.15))'
                      }}
                      onError={(e) => {
                        const parent = e.currentTarget.parentElement
                        if (parent) {
                          e.currentTarget.style.display = 'none'
                          let placeholder = parent.querySelector('.pizza-placeholder') as HTMLElement
                          if (!placeholder) {
                            placeholder = document.createElement('div')
                            placeholder.className = 'pizza-placeholder text-gray-500 text-2xl font-bold text-center px-4 absolute inset-0 flex items-center justify-center z-20'
                            parent.appendChild(placeholder)
                          }
                          placeholder.textContent = currentPizza.name
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Pizza Thumbnails Section */}
      <section className="py-12 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {pizzas.map((pizza, index) => (
              <button
                key={pizza.id}
                onClick={() => handlePizzaClick(index)}
                className={`relative w-full aspect-square rounded-full overflow-hidden transition-all duration-500 transform hover:scale-105 focus:outline-none ${
                  currentIndex === index 
                    ? 'ring-4 ring-pizza-orange scale-105 shadow-xl' 
                    : 'shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="absolute inset-0 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
                  <img 
                    src={pizza.thumbnail} 
                    alt={pizza.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                    style={{ objectPosition: 'center center' }}
                    onError={(e) => {
                      const parent = e.currentTarget.parentElement
                      if (parent) {
                        e.currentTarget.style.display = 'none'
                        const placeholder = document.createElement('div')
                        placeholder.className = 'text-gray-500 text-sm font-semibold text-center px-2 absolute inset-0 flex items-center justify-center bg-gray-200 pizza-thumb-placeholder'
                        placeholder.textContent = pizza.name
                        if (!parent.querySelector('.pizza-thumb-placeholder')) {
                          parent.appendChild(placeholder)
                        }
                      }
                    }}
                  />
                </div>
                
                {/* Selection indicator */}
                {currentIndex === index && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-pizza-orange rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Wavy Divider */}
      <WaveDivider position="top" color="#1f2937" />

      {/* Features Section */}
      <section className="bg-pizza-dark py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🍕', title: 'Fresh Ingredients', desc: 'We use only the freshest, locally-sourced ingredients for every pizza we make.' },
              { icon: '⚡', title: 'Fast Delivery', desc: 'Hot pizza delivered to your door in 30 minutes or less, guaranteed.' },
              { icon: '👨‍🍳', title: 'Expert Chefs', desc: 'Our master pizzaiolos bring years of experience to every pie.' }
            ].map((feature, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wavy Divider (flipped) */}
      <WaveDivider position="bottom" color="#1f2937" flip />

      {/* CTA Section */}
      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-pizza-dark mb-4">
            Ready to Order?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Build your perfect pizza or choose from our signature creations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/menu" 
              className="px-8 py-4 bg-pizza-orange text-white font-semibold rounded-full hover:bg-pizza-red transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Browse Menu
            </Link>
            <Link 
              to="/custom" 
              className="px-8 py-4 bg-transparent border-2 border-pizza-dark text-pizza-dark font-semibold rounded-full hover:bg-pizza-dark hover:text-white transition-all duration-300"
            >
              Build Your Own
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

