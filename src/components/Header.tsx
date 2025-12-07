import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/custom', label: 'Build Your Own' },
  { path: '/about', label: 'About Us' },
]

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="w-full px-8 py-6 relative z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            {/* Pizza Slice with Chef Hat */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:rotate-12 transition-transform duration-300">
              {/* Chef Hat */}
              <path d="M20 8C18 8 16 9 15 10L14 12L12 14C11 15 10 17 10 19V22H30V19C30 17 29 15 28 14L26 12L25 10C24 9 22 8 20 8Z" fill="#dc2626"/>
              <path d="M12 14L10 16L8 18C7 19 6 21 6 23V25H34V23C34 21 33 19 32 18L30 16L28 14" stroke="#dc2626" strokeWidth="1.5" fill="none"/>
              {/* Pizza Slice */}
              <path d="M20 20L8 32C8 32 6 30 6 28C6 26 7 24 8 22L20 20Z" fill="#ff6b35"/>
              <path d="M20 20L32 8C32 8 34 10 34 12C34 14 33 16 32 18L20 20Z" fill="#ff6b35"/>
              <path d="M20 20L8 32L20 20L32 8" stroke="#dc2626" strokeWidth="1.5"/>
            </svg>
          </div>
          <span className="text-2xl font-bold text-pizza-red italic transform -rotate-1 group-hover:text-pizza-orange transition-colors">
            Pizza
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? 'bg-pizza-orange text-white'
                  : 'text-gray-700 hover:text-pizza-orange hover:bg-pizza-orange/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/menu"
            className="ml-4 px-6 py-2 bg-pizza-dark text-white font-medium rounded-full hover:bg-pizza-red transition-all duration-300 hover:scale-105"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-2xl overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-4 space-y-2">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? 'bg-pizza-orange text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/menu"
            onClick={() => setIsOpen(false)}
            className="block text-center px-6 py-3 bg-pizza-dark text-white font-medium rounded-xl hover:bg-pizza-red transition-colors"
          >
            Order Now
          </Link>
        </div>
      </div>
    </header>
  )
}
