import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Tag,
  FolderOpen,
  Settings,
  Users,
  Gift,
  UtensilsCrossed,
  Ruler,
  ChefHat,
  FileText,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const adminMenuItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { path: '/admin/products', label: 'Products', icon: Package },
  { path: '/admin/categories', label: 'Categories', icon: FolderOpen },
  { path: '/admin/tags', label: 'Tags', icon: Tag },
  { path: '/admin/sizes', label: 'Sizes', icon: Ruler },
  { path: '/admin/toppings', label: 'Toppings', icon: UtensilsCrossed },
  { path: '/admin/ingredients', label: 'Ingredients', icon: ChefHat },
  { path: '/admin/included-items', label: 'Included Items', icon: FileText },
  { path: '/admin/promotions', label: 'Promotions', icon: Gift },
  { path: '/admin/reviews', label: 'Reviews', icon: FileText },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
  { path: '/admin/team', label: 'Team', icon: Users, adminOnly: true },
]

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    localStorage.removeItem('auth_token')
    navigate('/admin/login')
  }

  const menuItems = adminMenuItems.filter(() => {
    // Filter admin-only items based on user role
    // For now, show all items - you can add role checking later
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-pizza-purple text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-pizza-purple/20">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold">Admin</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-pizza-gold"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path || 
                  (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path))
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-pizza-gold text-pizza-purple font-semibold'
                          : 'text-white/80 hover:bg-pizza-purple/50 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-pizza-purple/20">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-pizza-purple/50 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4 ml-auto">
              <Link
                to="/"
                className="text-sm text-gray-600 hover:text-pizza-purple transition-colors"
              >
                View Store
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

