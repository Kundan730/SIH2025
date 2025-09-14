'use client'

import React, { useState } from 'react';
import { Anchor, Menu, X } from 'lucide-react';
import { ModeToggle } from '@/components/ThemeToggle';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300 bg-white/95 dark:bg-gray-900/95 border-blue-100 dark:border-gray-700 shadow-sm dark:shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Anchor className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              BlueCarbon MRV
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['features', 'solution', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="font-medium transition-all duration-200 hover:scale-105 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}

            {/* ModeToggle button */}
            <ModeToggle />

            {/* Get Started Button */}
            <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 active:scale-95">
              Get Started
            </button>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <ModeToggle />

            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg transition-all duration-300 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
            {['features', 'solution', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="block px-4 py-2 rounded-lg font-medium transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
            <div className="px-4">
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
