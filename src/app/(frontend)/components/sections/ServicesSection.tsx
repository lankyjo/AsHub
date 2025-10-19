'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { easeOut, motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ServicesSection() {
  const services = [
    {
      title: 'Interior Design & Consultation',
      description: 'Expert design guidance to bring your vision to life.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDxTbas3G9cd08hJ7dLRPo9xVlgXFU_sTiUmNah7AywRAokEJJwZgcTfF8qWQAKziWNMELUXhg_EpKbLZKLmp3W6ClsEsWxFc44Xrg_5t54H7zmliKuVbJ_IPXc-YyR3tc6y4fweFQTewQGk7zlgWQxdtVXgk4D99OaExEWJG6a0IQbacIAPw9a4a1dNrckdA4VA0Q-shqVF6k6ae-hSfPgdT-ayPEgugWckb6bfn1yNAug2jCusj-2kiZLv2T3P-lo-onAtrodfJh-',
    },
    {
      title: 'Custom Furniture & Joinery',
      description: 'Bespoke furniture crafted to your exact specifications.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDq-TrAB9tFFaMIqjE6t556S15B0kRhlJIiAtY27TZyPRFBzD30Zgn34WttxCI97u3BEMqqgnsycRRYJQ8C61gGnkJT9Bi4H8-mJYwDwLXMG0KJggriJ6_C_aydVElsRCIeSv0Qzf2cAGysUa0h_7Wk-tmjEpynf5DGaTl5RPzFbCU96CCu0bUfK0uiw9u6uZPvzwiV3GHRSbF2NqrHi5YM2ABr9CYbn1cfzdzzgg02WUGViPjRlTSiIsaPggzjHWfdbdoAY8RC8zvV',
    },
    {
      title: 'Full Interior Fit-Outs',
      description: 'Complete solutions for new builds and commercial spaces.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDBbJsR_PPuw5ZVjagLsnd5J00YXdoDLMpRBied89_S0xNx2Y520nIWMG_8Iy3eRGlvgpzQIF7qNQbjVozfNXQMvXu3iFfoDsWNFRVIo39PQe1SiBlm2s5mVbuUs97vF_imLZfKWOizFMwh1KmRjJViMQEJCwOm227FWhIigGzGTdnEj1GKqFmwbY2c-Vz_6UE3161qebEsqwyaX4EXq_c3b8WTkk8DFDs5j27myZrrQFBtsNF1trOkNRSVIH2ksO5j8_j2na9Z5UWi',
    },
    {
      title: 'Renovation & Remodeling',
      description: 'Revitalize your existing space with our remodeling expertise.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAfGYS2CxcjrldWjOMV9kodjQIq9cfOoMLW-FAtC0FGyPDPa1t5GxvVCrHkzQPSSsgr4zeqgmypdOZzRmkqXNmyc09Vl5XlqwcYxgLgJ8UumRCeny0dT1SJawn7Hs3WWcjHEtZuE67FYcwG0zWwbSBbs3ofjGVRewub-ru3oeTDMYeJdoPPIOqWR21YnYutoZ-CkehXP8XYj69Rb8sULL7Rd8ewEa91r0v_iS5V5p7mf5WtmMdKXYVHdWmZ3-vWkSFoMOO5W9oxABQK',
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
    <section id="services" className="py-16 sm:py-24" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.p
            variants={itemVariants}
            className="text-base font-semibold leading-7 text-primary"
          >
            Our Services
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl font-[anton]"
          >
            Crafting Spaces, Inspiring Lives
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            We offer a comprehensive suite of services to transform your space into a reflection of
            your unique style and needs.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service, i) => (
            <motion.div key={i} variants={itemVariants}>
              <ServiceCard
                title={service.title}
                description={service.description}
                image={service.image}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Inline component: ServiceCard
 */
function ServiceCard({
  title,
  description,
  image,
}: {
  title: string
  description: string
  image: string
}) {
  return (
    <div className="flex flex-col drop-shadow-lg overflow-hidden rounded-lg bg-white dark:bg-background-dark/50 shadow-lg transition-transform duration-300 h-full hover:-translate-y-2">
      <div
        className="h-48 w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 flex-1 text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  )
}
