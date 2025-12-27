import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client/react'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { ToastProvider } from './contexts/ToastContext'
import { apolloClient } from './lib/apollo-client'
import { Header } from './components/Header'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PageTransition } from './components/PageTransition'
import { 
  HomePage, 
  MenuPage, 
  CustomPage, 
  AboutPage, 
  CartPage, 
  ProductDetailPage, 
  AdminLoginPage, 
  AdminDashboardPage,
  OrdersPage,
  OrderDetailPage,
  ProductsPage,
  ProductEditorPage,
  CategoriesPage,
  TagsPage,
  SizesPage,
  ToppingsPage,
  IngredientsPage,
  IncludedItemsPage,
  PromotionsPage,
  ReviewsPage,
  SettingsPage,
  TeamPage
} from './pages'

const AppContent = () => {
  const location = useLocation()
  
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Header - Only show on non-admin pages */}
      {!location.pathname.startsWith('/admin') && <Header />}
      
      {/* Routes with Page Transition */}
      <PageTransition>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/custom" element={<CustomPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<CartPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/orders" 
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/orders/:id" 
            element={
              <ProtectedRoute>
                <OrderDetailPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/products" 
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/products/new" 
            element={
              <ProtectedRoute>
                <ProductEditorPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/products/:id/edit" 
            element={
              <ProtectedRoute>
                <ProductEditorPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/categories" 
            element={
              <ProtectedRoute>
                <CategoriesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/tags" 
            element={
              <ProtectedRoute>
                <TagsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/sizes" 
            element={
              <ProtectedRoute>
                <SizesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/toppings" 
            element={
              <ProtectedRoute>
                <ToppingsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/ingredients" 
            element={
              <ProtectedRoute>
                <IngredientsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/included-items" 
            element={
              <ProtectedRoute>
                <IncludedItemsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/promotions" 
            element={
              <ProtectedRoute>
                <PromotionsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/reviews" 
            element={
              <ProtectedRoute>
                <ReviewsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/team" 
            element={
              <ProtectedRoute>
                <TeamPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </PageTransition>

      {/* Footer - Only show on non-admin pages */}
      {!location.pathname.startsWith('/admin') && (
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
      )}
    </div>
  )
}

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <Router>
              <AppContent />
            </Router>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
