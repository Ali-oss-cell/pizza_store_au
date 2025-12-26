import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ShoppingCart, Search } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/custom', label: 'Build Your Own' },
  { path: '/about', label: 'About Us' },
]

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { cartCount } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="Pizza Store Logo" 
              className="h-10 md:h-12 w-auto transform group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-pizza-gold text-pizza-purple shadow-md'
                    : 'text-gray-700 hover:text-pizza-purple hover:bg-pizza-gold/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="w-full relative">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                  isSearchFocused ? 'text-pizza-purple' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search pizzas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold transition-all bg-gray-50 hover:bg-white"
                />
              </div>
            </form>
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <Link 
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors group"
            >
              <ShoppingCart className={`w-6 h-6 transition-colors ${
                cartCount > 0 ? 'text-pizza-purple' : 'text-gray-600'
              }`} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pizza-gold text-pizza-purple text-xs rounded-full flex items-center justify-center font-bold shadow-md">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search pizzas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pizza-gold focus:border-pizza-gold transition-all bg-gray-50"
            />
          </form>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`lg:hidden border-t border-gray-100 bg-white transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 py-4 space-y-2">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? 'bg-pizza-gold text-pizza-purple shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 rounded-xl font-medium transition-all duration-300 bg-pizza-purple text-white hover:bg-pizza-purple/90 relative"
          >
            <div className="flex items-center justify-between">
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="w-6 h-6 bg-pizza-gold text-pizza-purple text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
