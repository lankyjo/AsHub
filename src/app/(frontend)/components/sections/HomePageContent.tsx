'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { easeOut, motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { DraftingCompass, Palette, Search } from 'lucide-react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
      className="flex flex-col rounded-lg bg-gradient-to-br from-white/10 to-white/5 dark:from-black/10 dark:to-black/5 p-6 ring-1 ring-inset ring-white/20 dark:ring-black/20 backdrop-blur-sm"
    >
      <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {icon}
        </motion.div>
        {title}
      </dt>
      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-auto"
        >
          {description}
        </motion.p>
      </dd>
    </motion.div>
  )
}

const WhyChooseUsSection = () => {
  // [ARRAYS MARKED] - features array with 3 feature cards
  const features = [
    {
      icon: <DraftingCompass className="h-5 w-5 flex-none text-primary" aria-hidden="true" />,
      title: 'Precision Craftsmanship',
      description:
        'Our skilled artisans meticulously craft each piece, ensuring flawless execution and lasting durability.',
    },
    {
      icon: <Palette className="h-5 w-5 flex-none text-primary" aria-hidden="true" />,
      title: 'Premium Materials',
      description:
        'We source only the finest materials, from sustainable hardwoods to luxurious fabrics, for a superior finish.',
    },
    {
      icon: <Search className="h-5 w-5 flex-none text-primary" aria-hidden="true" />,
      title: 'Attention to Detail',
      description:
        'Every element, from the overall layout to the smallest accent, is carefully considered to create a cohesive and stunning design.',
    },
  ]

  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 })

  const sectionRef = useRef(null)
  const sectionInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        easeOut,
      },
    },
  }

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden" ref={heroRef}>
        <div className="container mx-auto px-6 lg:flex lg:items-center lg:gap-x-10 lg:px-8 py-10">
          <motion.div
            className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto"
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
          >
            <motion.h1
              variants={itemVariants}
              className="font-anton text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
            >
              Crafting Your Dream Space
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
            >
              A's Hub transforms your vision into reality with bespoke interior design and furniture
              solutions. Experience the difference of precision craftsmanship and personalized
              service.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-10 flex items-center gap-x-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#services"
                  className="rounded-lg bg-primary px-6 py-3 text-xs font-bold text-white shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all"
                >
                  Explore Our Services
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
                <Link
                  href="#contact"
                  className="text-xs font-semibold leading-7 text-gray-900 dark:text-white"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow"
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={
              heroInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: 50 }
            }
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi1-_yT5Twcx62kbcNQsNcM9d4I9pAQScO7ad3e0B_FpNJlfYFeLMGpljvf9CTtrGm9AN7w75Hh-qRjQdTL4ArINeNM--Ah03ehxImkejsYsL89Km2eypfKH9VG8SHe4tQlRxo-7PrdjsyV5yhOn6Czsw0uD2-I7ixkwP9oVJ_liwJNoZe66X3P5LGl0bvPUY7OmO9ExUSJ3N-FdDc1gAu5FWRkDj0heMVUaM0DH3HTE-2tjdMHEngqtHiH2sYKZIryBJWPQHwDVSG"
                alt="Modern living room interior"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Commitment to Excellence Section */}
      <section className="py-10" ref={sectionRef}>
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            variants={containerVariants}
            initial="hidden"
            animate={sectionInView ? 'visible' : 'hidden'}
          >
            <motion.h2
              variants={itemVariants}
              className="text-base font-semibold leading-7 text-primary"
            >
              Our Commitment to Excellence
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="font-anton mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
            >
              Why Choose A's Hub?
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
            >
              At A's Hub, we are dedicated to delivering exceptional quality and service. Our core
              values ensure your project is a success.
            </motion.p>
          </motion.div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WhyChooseUsSection
