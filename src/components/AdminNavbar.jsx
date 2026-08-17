import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';

// ============================================
// Admin Navbar
// Same dark theme + gradient accent as the main Navbar
// Decorative top bar with a "Back to Store" button
// ============================================

const AdminNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white/90 dark:bg-gray-950/90 text-gray-900 dark:text-white backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800/60 transition-colors duration-300 ${
        scrolled ? 'shadow-md shadow-slate-200/50 dark:shadow-black/40' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Title */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/30">
              PC
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              Admin Dashboard
            </span>
          </div>

          {/* Right side: Dark mode + Back to Store */}
          <div className="flex items-center gap-3">
            <DarkModeToggle />
            <Link
              to="/"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 dark:bg-white text-white dark:text-gray-900 dark:hover:bg-gray-100 font-semibold px-4 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-purple-500/20 active:scale-95"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="hidden sm:inline">Back to Store</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;