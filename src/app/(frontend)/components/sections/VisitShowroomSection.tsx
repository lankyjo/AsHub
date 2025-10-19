'use client'

import React from 'react'
import Link from 'next/link'
import { easeOut, motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin } from 'lucide-react'

const VisitShowroomSection = () => {
  const address = 'CVS Plaza Ademola Adetokunbo Wuse 2, Abuja'
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

  const mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.198305016201!2d7.45781607583648!3d9.046189989025028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b5f54124997%3A0x67c29e18b6e49220!2sCVS%20Plaza!5e0!3m2!1sen!2sng!4v1676295325515!5m2!1sen!2sng'

  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" ref={ref}>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Text Content */}
        <motion.div
          className="order-2 lg:order-1"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="font-anton text-3xl sm:text-4xl font-bold text-text-light dark:text-text-dark mb-4"
          >
            Showroom / Workshop Peek
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-text-light/80 dark:text-text-dark/80 mb-6"
          >
            Experience the heart of our craftsmanship. Visit our showroom and workshop to see where
            design comes to life. We believe in transparency and letting our work speak for itself.
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-start gap-4 mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <MapPin className="text-primary text-3xl mt-1 flex-shrink-0" aria-hidden="true" />
            </motion.div>
            <div>
              <h3 className="font-bold text-text-light dark:text-text-dark">Our Address</h3>
              <p className="text-text-light/80 dark:text-text-dark/80">{address}</p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-white justify-center bg-primary font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors duration-300"
            >
              Visit Us Today
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column: Embedded Map */}
        <motion.div
          className="order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        >
          <motion.div
            className="aspect-[4/3] w-full max-h-[500px] md:max-h-[592px] rounded-xl overflow-hidden shadow-lg"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <iframe
              src={mapEmbedUrl}
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="A's Hub Showroom Location"
            ></iframe>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default VisitShowroomSection
