'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import StaggeredMenu from '@/components/StaggeredMenu'
import { LogoIcon } from './LogoIcon'

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '#' },
  { label: 'About', ariaLabel: 'Learn about us', link: '#about' },
  { label: 'Services', ariaLabel: 'View our services', link: '#services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' },
  { label: 'Projects', ariaLabel: 'View our portfolio', link: '#projects' },
]
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
  ]

  return (
    <header
      className={`fixed top-0 w-full p-4 z-50 text-white transition-all duration-500 ${
        isScrolled ? 'bg-foreground/30 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center relative">
        {/* Logo */}
        <div>
          <Link href="/" className="text-lg font-anton flex items-center gap-1">
            <LogoIcon />
            <span>A’s Hub</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-3">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.link}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side */}
        <div className="flex gap-5 items-center">
          <Button asChild>
            <Link href="#contact">Get Quote</Link>
          </Button>
          <div className="md:hidden relative z-[1000000]">
            <StaggeredMenu
              position="right"
              items={menuItems}
              socialItems={socialItems}
              displaySocials={true}
              displayItemNumbering={true}
              menuButtonColor="#fff"
              openMenuButtonColor="#000"
              changeMenuColorOnOpen={true}
              colors={['oklch(0.6723 0.1606 244.9955)', 'oklch(0.6818 0.1584 243.354 / 61.65%)']}
              accentColor="oklch(0.6818 0.1584 243.354 / 61.65%)"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
