"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add scroll event listener to change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-gradient-to-r from-purple-900/70 via-indigo-800/70 to-purple-900/70 bg-[radial-gradient(ellipse_100%_100%_at_50%_20%,rgba(149,125,255,0.3),rgba(255,255,255,0))]" 
        : "bg-gradient-to-r from-purple-900/70 via-indigo-800/70 to-purple-900/70 bg-[radial-gradient(ellipse_100%_100%_at_50%_20%,rgba(149,125,255,0.3),rgba(255,255,255,0))]"
    }`}>
      <div className="absolute inset-0"></div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 relative z-10">
          <div className="flex items-center justify-between w-full">
            <Link 
              href="/" 
              className="flex items-center space-x-2 bg-clip-text bg-gradient-to-br from-white via-30% via-white to-white/30 font-bold text-2xl text-center leading-[1.2] md:leading-[1.3] text-transparent"
            >
              <span className="text-purple-300">⬢</span>
              <span>ImpactArc</span>
            </Link>
            
            <div className="hidden md:flex space-x-8">
              <Link 
                href="#top-creators"
                className="text-gray-200 hover:text-white hover:bg-purple-500/20 px-3 py-2 rounded-md transition-colors duration-200 font-medium"
              >
                Browse Creators
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button - hidden on desktop */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-gray-200 hover:text-white"
              aria-label="Toggle mobile menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
          <div className="md:hidden bg-indigo-900/95 backdrop-blur-md py-2 px-4 rounded-b-lg border-t border-purple-700/50 shadow-lg">
            <div className="flex flex-col space-y-2 pb-3 pt-2">
              <Link 
                href="/top-creators"
                className="text-gray-200 hover:text-white hover:bg-purple-500/20 px-3 py-2 rounded-md transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Top Creators
              </Link>
              <Link 
                href="/browse"
                className="text-gray-200 hover:text-white hover:bg-purple-500/20 px-3 py-2 rounded-md transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Creators
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}