interface StatusBadgeProps {
  status: string
  display?: string
  className?: string
}

export const StatusBadge = ({ status, display, className = '' }: StatusBadgeProps) => {
  const getStatusStyles = (status: string) => {
    const statusLower = status.toLowerCase()
    
    if (statusLower.includes('pending') || statusLower.includes('confirmed')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
    if (statusLower.includes('preparing')) {
      return 'bg-purple-100 text-purple-800 border-purple-200'
    }
    if (statusLower.includes('ready')) {
      return 'bg-blue-100 text-blue-800 border-blue-200'
    }
    if (statusLower.includes('completed') || statusLower.includes('delivered') || statusLower.includes('picked')) {
      return 'bg-green-100 text-green-800 border-green-200'
    }
    if (statusLower.includes('cancelled')) {
      return 'bg-red-100 text-red-800 border-red-200'
    }
    if (statusLower.includes('active') || statusLower.includes('approved')) {
      return 'bg-green-100 text-green-800 border-green-200'
    }
    if (statusLower.includes('inactive') || statusLower.includes('rejected')) {
      return 'bg-gray-100 text-gray-800 border-gray-200'
    }
    
    return 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(status)} ${className}`}
    >
      {display || status}
    </span>
  )
}

