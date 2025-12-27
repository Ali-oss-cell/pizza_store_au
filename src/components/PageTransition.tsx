import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

// Route hierarchy for direction detection
const routeOrder: Record<string, number> = {
  '/': 0,
  '/menu': 1,
  '/product': 2,
  '/custom': 3,
  '/cart': 4,
  '/about': 5,
  '/admin/login': 6,
  '/admin/dashboard': 7,
}

const getRouteOrder = (pathname: string): number => {
  if (pathname.startsWith('/product/')) return routeOrder['/product']
  if (pathname.startsWith('/admin/')) {
    if (pathname.includes('dashboard')) return routeOrder['/admin/dashboard']
    return routeOrder['/admin/login']
  }
  return routeOrder[pathname] ?? 0
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState<'entering' | 'exiting' | 'idle'>('idle')
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const prevPathRef = useRef<string>(location.pathname)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip animation on first render
    if (isFirstRender.current) {
      isFirstRender.current = false
      setDisplayLocation(location)
      return
    }

    if (location.pathname !== prevPathRef.current) {
      const currentOrder = getRouteOrder(location.pathname)
      const prevOrder = getRouteOrder(prevPathRef.current)

      // Determine direction
      if (currentOrder > prevOrder) {
        setDirection('forward')
      } else if (currentOrder < prevOrder) {
        setDirection('backward')
      } else {
        setDirection(location.pathname.length > prevPathRef.current.length ? 'forward' : 'backward')
      }

      // Start exit animation
      setTransitionStage('exiting')
      prevPathRef.current = location.pathname

      // After exit animation, update location and start enter
      const exitTimer = setTimeout(() => {
        setDisplayLocation(location)
        setTransitionStage('entering')
        
        // After enter animation, set to idle
        const enterTimer = setTimeout(() => {
          setTransitionStage('idle')
        }, 500)
        
        return () => clearTimeout(enterTimer)
      }, 400)

      return () => clearTimeout(exitTimer)
    }
  }, [location.pathname])

  const getAnimationClass = () => {
    if (transitionStage === 'exiting') {
      return direction === 'forward' 
        ? 'page-exit-forward' 
        : 'page-exit-backward'
    }
    if (transitionStage === 'entering') {
      return direction === 'forward'
        ? 'page-enter-forward'
        : 'page-enter-backward'
    }
    return 'page-idle'
  }

  return (
    <div className={`page-transition-wrapper ${getAnimationClass()}`}>
      <div className="page-transition-content" key={displayLocation.pathname}>
        {children}
      </div>
    </div>
  )
}
