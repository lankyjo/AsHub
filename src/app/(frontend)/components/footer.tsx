import React from 'react'
import Link from 'next/link'
import { LogoIcon } from './LogoIcon'

// A small component for the logo to keep the main component clean

const Footer = () => {
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '#' },
    { label: 'About', ariaLabel: 'Learn about us', link: '#about' },
    { label: 'Services', ariaLabel: 'View our services', link: '#services' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' },
    { label: 'Projects', ariaLabel: 'View our portfolio', link: '#projects' },
  ]
  return (
    <footer className="bg-white/10 dark:bg-black/10">
      <div className="container mx-auto px-6 py-12 lg:px-8">
        <div className="flex items-center justify-center">
          <LogoIcon />
          <h2 className="text-xl font-anton font-extrabold text-gray-900 dark:text-white">
            A's Hub
          </h2>
        </div>
        <nav aria-label="Footer" className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4">
          {menuItems.map((link) => (
            <Link
              key={link.ariaLabel}
              href={link.link}
              className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} A's Hub. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
