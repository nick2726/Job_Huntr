import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Sparkles, Moon, Sun, Menu, X, FileText, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 transition-colors sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Desktop Nav Links */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link to="/" onClick={closeMenu} className="flex-shrink-0 flex items-center gap-2">
              <Briefcase className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">JobHuntr</span>
            </Link>
            <div className="hidden md:flex md:space-x-6">
              <Link to="/internships" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                Browse Jobs
              </Link>
              <Link to="/ats-scanner" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1.5 px-1 pt-1 text-sm font-medium transition-colors">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>ATS Resume Scanner</span>
              </Link>
            </div>
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/api-docs-link" onClick={() => window.open('http://localhost:5000/api-docs', '_blank')} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-colors">
              API Docs
            </Link>
            <button onClick={toggleTheme} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors cursor-pointer" aria-label="Toggle theme">
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-500" />}
            </button>
            <Link to="/login" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Log in
            </Link>
            <Link to="/register" className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
              Sign up
            </Link>
            <Link to="/profile" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Profile
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={toggleTheme} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors cursor-pointer" aria-label="Toggle theme">
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-500" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 pt-2 pb-4 space-y-2 animate-fade-in">
          <Link
            to="/internships"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 transition-colors"
          >
            Browse Jobs
          </Link>
          <Link
            to="/ats-scanner"
            onClick={closeMenu}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>ATS Resume Scanner</span>
          </Link>
          <button
            onClick={() => { window.open('http://localhost:5000/api-docs', '_blank'); closeMenu(); }}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 transition-colors"
          >
            API Documentation
          </button>
          <hr className="border-gray-100 dark:border-gray-700 my-2" />
          <Link
            to="/profile"
            onClick={closeMenu}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 transition-colors"
          >
            My Profile
          </Link>
          <div className="flex gap-2 pt-2">
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex-1 text-center py-2 px-4 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={closeMenu}
              className="flex-1 text-center py-2 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
