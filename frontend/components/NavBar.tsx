'use client'

import React, { useState, useEffect } from 'react';
import { Anchor, Menu, X, ChevronDown } from 'lucide-react';
import { ModeToggle } from '@/components/ThemeToggle';
import { useTheme } from 'next-themes';
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { publicKey } = useWallet();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-white/98 dark:bg-gray-900/98 shadow-md' : 'py-4 bg-white/95 dark:bg-gray-900/95 shadow-sm'} ${isDark ? 'border-gray-800' : 'border-blue-100/50'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:rotate-3 hover:scale-105">
              <Anchor className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                BlueCarbon MRV
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Blockchain Verified</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {[
              { name: 'Home', link: '/' },
              { name: 'Admin', link: '/admin' },
              { name: 'Registry', link: '/registery' },
              { name: 'Stakeholder', link: '/stakeholder' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="group relative font-medium transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
              >
                {item.name}
                {/* Hover effect line */}
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {/* ModeToggle button */}
            <div className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
              <ModeToggle />
            </div>

            {/* Get Started Button */}
            {/* <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 active:scale-95 border border-transparent">
              Get Started
            </button> */}
            <div className="flex items-center space-x-3">
  <WalletMultiButton />
</div>

          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <div className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
              <ModeToggle />
            </div>

            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg transition-all duration-300 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 active:scale-95"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
            {[
              { name: 'Home', link: '/' },
              { name: 'Admin', link: '/admin' },
              { name: 'Registry', link: '/registery' },
              { name: 'Stakeholder', link: '/stakeholder' }
            ].map((item, index) => (
              <a
                key={item.name}
                href={item.link}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 ${index === 0 ? 'mt-2' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="px-4 pt-2">
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
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
