'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TextRoll } from 'components/motion-primitives/text-roll'
import Link from 'next/link'
import React from 'react'
import { easeOut, motion } from 'framer-motion'

export default function HeroSection() {
  // Faster and smoother animations
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        easeOut,
      },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6, // start shortly after heading
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        easeOut,
      },
    },
  }

  return (
    <section className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background Video */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://lh3.googleusercontent.com/aida-public/AB6AXuBlOOoS8O-1LOvKqyyjRMYWUc108A1oNYkeBk87-4nDAz6VaCDE7wle0zd_LY0h8SdNk0AyGqSCPmwZM6s7oPR0oYl4QVoszElamn1go9KGGkpS6V2f59zHjbGUzS18Dej9nY1-sPZRhqCXhWk9eNJWfINgdzbflsKxsC60Xi66cVD6BZ7riy3BOXAjzCS42WYPCqKXYstykVrE5xOwov1q3VQQ3yZRuO_HXObsRql5dIh1ukQxHgGNuoNA-U7OMaVkbALNRs29qBcf"
          className="w-full h-full object-cover"
          src={'/bgvid.mp4'}
        />
        <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white p-6">
        {/* Heading */}
        <motion.div
          className="max-w-4xl mx-auto"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl tracking-wide font-extrabold leading-tight mb-4 font-[anton]">
            <TextRoll
              variants={{
                enter: {
                  initial: { rotateX: 0, filter: 'blur(0px)' },
                  animate: { rotateX: 90, filter: 'blur(2px)' },
                },
                exit: {
                  initial: { rotateX: 90, filter: 'blur(2px)' },
                  animate: { rotateX: 0, filter: 'blur(0px)' },
                },
              }}
            >
              Where Function Meets Luxury
            </TextRoll>
          </h1>
        </motion.div>

        {/* Subtitle and Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-2"
        >
          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
              We design and craft bespoke interiors and furniture that redefine modern living.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <HeroButton variant="primary">
              <Link href={'#contact'} className="block">
                Book a Consultation
              </Link>
            </HeroButton>
            <HeroButton variant="outline">
              <Link href={'#services'}>Explore Our Work</Link>
            </HeroButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Inline button component to handle both primary and outline variants
 */
function HeroButton({
  children,
  variant = 'primary',
}: {
  children: React.ReactNode
  variant?: 'primary' | 'outline'
}) {
  const isPrimary = variant === 'primary'

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
      <Button
        className={cn(
          'w-full sm:w-auto text-sm transition-colors duration-300',
          isPrimary
            ? 'bg-primary text-white hover:bg-primary/90'
            : 'bg-white/20 dark:bg-white/10 text-white backdrop-blur-sm hover:bg-white/30 dark:hover:bg-white/20',
        )}
      >
        {children}
      </Button>
    </motion.div>
  )
}
