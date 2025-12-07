import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { HomePage, MenuPage, CustomPage, AboutPage } from './pages'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/custom" element={<CustomPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-pizza-dark text-white py-12 px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-pizza-orange">🍕</span> Pizza
              </h3>
              <p className="text-gray-400 text-sm">
                Crafting authentic Italian pizzas with love and passion since 2014.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/menu" className="hover:text-pizza-orange transition-colors">Menu</a></li>
                <li><a href="/custom" className="hover:text-pizza-orange transition-colors">Build Your Own</a></li>
                <li><a href="/about" className="hover:text-pizza-orange transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>123 Pizza Street, NY</li>
                <li>(555) 123-PIZZA</li>
                <li>hello@pizzastore.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hours</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Mon - Thu: 11am - 10pm</li>
                <li>Fri - Sat: 11am - 12am</li>
                <li>Sunday: 12pm - 9pm</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            © 2024 Pizza Store. All rights reserved. Made with ❤️ and 🍕
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
