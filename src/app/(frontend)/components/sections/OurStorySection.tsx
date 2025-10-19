'use client'

import React from 'react'
import { easeOut, motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface ValueCardProps {
  title: string
  description: string
}

const ValueCard = ({ title, description }: ValueCardProps) => (
  <div className="bg-background-light dark:bg-background-dark/30 drop-shadow-lg p-8 rounded-lg">
    <h4 className="text-xl font-bold text-primary mb-3">{title}</h4>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
)

const OurStorySection = () => {
  const values = [
    {
      title: 'Mission',
      description:
        'To create exceptional living spaces that enhance the lives of our clients through innovative design and superior quality.',
    },
    {
      title: 'Vision',
      description:
        'To be the leading provider of bespoke interior design and furniture solutions, known for our creativity, craftsmanship, and customer satisfaction.',
    },
    {
      title: 'Core Values',
      description: 'Integrity, Creativity, Quality, Collaboration, and Client-Centricity.',
    },
  ]

  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
    <section id="about" className="flex-grow">
      <div className="container mx-auto px-6 py-8 lg:py-24" ref={ref}>
        <div className="max-w-5xl mx-auto">
          {/* --- Introduction Section --- */}
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.h2
              variants={itemVariants}
              className="font-anton text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              Our Story
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              At A's Hub, we believe that every space has a story to tell. Founded in 2010 by Akin,
              our company is dedicated to transforming houses into homes through thoughtful design
              and quality craftsmanship. We specialize in creating spaces that are not only
              beautiful but also functional and reflective of our clients' unique lifestyles.
            </motion.p>
          </motion.div>

          {/* --- Image with Quote Section --- */}
          <motion.div
            className="bg-white dark:bg-background-dark/50 rounded-xl mb-16 overflow-hidden drop-shadow-lg"
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div
              className="w-full h-96 bg-cover bg-center"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDE6Dgs5InXPfIPV7W0zgFFSAKO-O3qzNmxw2IgRkBUnvlUX4iG2gHOxAxtEONuecDnqz9awR5vcrBW19hnxfqo0Ry2pYFqJJmw7q5MMuCq2Pk7a8MeugNmhgTnzGCXN71ga07Ivsj2f2AtPXaZaNJhS1-9rwxMmMZEaZsy0Ok3yRbpT4x6gFGzOdg7FmYYGrPdYuAlFWZe84HjdmzA2mafjjY52hFoMCLXOU_3LYtarbfY8Ks05c5L2pWhYkxYWarTj3OlBhHbxJdy")`,
              }}
            />
            <div className="p-8 text-center italic text-xl text-gray-600 dark:text-gray-400 bg-background-light dark:bg-background-dark/20">
              <p>"Every space we create is a blend of creativity, craftsmanship, and comfort."</p>
            </div>
          </motion.div>

          {/* --- Mission, Vision, and Values Section --- */}
          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.div variants={itemVariants} className="text-center">
              <h3 className="font-anton text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Our Mission, Vision, and Values
              </h3>
            </motion.div>
            <motion.div
              className="grid md:grid-cols-3 gap-8 text-center"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {values.map((value) => (
                <motion.div key={value.title} variants={itemVariants}>
                  <ValueCard title={value.title} description={value.description} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default OurStorySection
