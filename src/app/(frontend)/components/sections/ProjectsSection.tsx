'use client'

import React from 'react'
import Image from 'next/image'
import { easeOut, motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog'

interface ProjectCardProps {
  title: string
  imageUrl: string
  description: string
}

const ProjectCard = ({ title, imageUrl, description }: ProjectCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group drop-shadow-xl relative block cursor-pointer overflow-hidden rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
          <div className="aspect-square relative">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="100%"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <div className="transform transition-all duration-300 lg:group-hover:translate-y-0 lg:translate-y-8">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="mt-1 text-sm font-medium text-white lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                View Project →
              </p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-anton text-2xl text-primary">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          </div>
          <DialogDescription className="text-base text-gray-600 dark:text-gray-400">
            {description}
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const ProjectsSection = () => {
  // [ARRAYS MARKED] - projects data array with 8 projects
  const projects = [
    {
      title: 'Modern Living Room',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB5dlhTZL_lOWkunmik0PvPvwD0EpDN9ipcaeAPaq8OpmRN_HONBxsVH4zn8Tw6URTOuu9bn8PR4Y7KCO09uhQ8_25jm3nVTzXAhD-Hpom4iRN1hZucCmNn9FN3_g9OwaVAVrzjYvpAUuIwOSuCaCwQKa8vFkUafCMN0eMlOxyrio1SkMsL15tkljny-jfAZu_yM37SAlU5RsvxUaOMVQdiaZm3aPyUyWAulTQ9Ai9m1SNpvwgtxTTIwI5fSS197NMW8n6m5IYQejQ6',
      description:
        'A spacious and light-filled living area designed for comfort and style. This project features clean lines, a neutral color palette accented with bold textures, and custom-built shelving to create a sophisticated yet inviting atmosphere.',
    },
    {
      title: 'Contemporary Kitchen',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAdVDAeYy6FNR4F6peMZ6NqAE0fz8SfI_ryigXtfnFEorAeTgvtK_WmSKjD3zNb-X6om_XUUJpkLLrHMeMIOyrJvoYc9MO0ubEfvnKQKAt3tXGYeqM0Tvn9_aM3S_3IGLVBmGL-t5NRx55quZkqsaxHYLBPIVrquTtEhXNiPjJiz3003INPaTR-vXTPS24AZAnxFkrHGCJZAm1MLIAqgQ0vGkq6LUO7D4HDy5SHFxBM-TPJ4vEQoI2kiWCLyst8PIyTCccHl8BQ9PfG',
      description:
        'This kitchen renovation blends functionality with sleek, contemporary design. It boasts state-of-the-art appliances, quartz countertops, and a large central island perfect for both cooking and entertaining.',
    },
    {
      title: 'Minimalist Bedroom',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCnG7AHBuy8hUAadWG7ZnT0Qi3tlpgSOE1rK8ffOOma6yFYPb5ZneehfJ7lrITafhJYbgpN59FZwB1MCsdl_nMgkRWhQTjU-ZL-rDfwIIf_P2oyp6jM_mvE98A8Q7cebImQHx-uAvG9R2Qphx-uv5dp3XiHTE1WKd0YDx_zaZY6m9oQ5MdwgYusW4PvQz6CFR6oOlLivkGXQmd5E4vJ4ZCSr1D5JFePIhev5DkDIjzbShQazIzFFDHwiTBBT-lUZ3uBRNgwOmFulQPE',
      description:
        'A serene retreat designed with minimalist principles. The focus is on natural light, uncluttered surfaces, and a calming color scheme to promote rest and relaxation. Integrated storage solutions keep the space tidy and peaceful.',
    },
    {
      title: 'Luxury Bathroom',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDRvjuUDoCGZwUlAr51vnRVxU2emXXMBeMBZg-HRhgkfgieeJompXilEkfT1sTHjoEOtS_7C4iEJExCWZvtzxIxVxh2qruJzGLFnrPZwRu5IpYi1KDPGxEZYpAOVqztvCtJ4k9xIEUrTtPUBu_oPmCndPoqjp1UcMNt5lKElz7mvj1xnbFp9Z6TGYEooKVDeeREHUDbi2IegGcHXMZWSSrv18VT7Ne7WE0SHleYZXtwCr8XSw80axTY0FyvOMcE4yJ0Zm1Og0p1XAqi',
      description:
        'An opulent, spa-like bathroom featuring a freestanding tub, a walk-in rain shower, and marble tiling throughout. High-end fixtures and ambient lighting create an experience of ultimate luxury and indulgence.',
    },
    {
      title: 'Cozy Home Office',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBHK0CrQnU3K60QTF8zKkXQgurWM3_bWr5R3akExY7i5EBOEyt8yTDdHFTNGhD36GKL9rjskw7lCx_QnJZ43lOjIaLwXytGj52SVVR3gVfwgshvILpf9D6u-gX9GMsR13wAfPZ82_sywRvgVyIIxKhmSeHOzdqnHdpJ37AEBzLY42U3_n95Andg6jrtNVsDLA-fDZSGzqha-Y3czNoxzqvlHHgItNF_1JVd5IEDna4KaFG8Sot0qwcO3tAs0jS1dkZg9X59v3ADremm',
      description:
        'A functional and inspiring workspace designed for productivity. This home office includes custom cabinetry, an ergonomic setup, and plenty of natural wood tones to create a warm and inviting environment.',
    },
    {
      title: 'Elegant Dining Room',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCWlszUb6beI0reErchwBYVCXB0-XJOayMQa-wop9aebCVrvamZwFjDHVuyHay67ymNebYOJBuUwGxqABuiirhiT9zgTt8_YfY9KbhWMJ9jfOd5L2PSR1KmB7glwIMb5_h-9YcysvrA8PR3pUQlH7QTf5fY3YyV2o1Pu7635HE0aFRxbC3JoIAoWMU7wL-xcxwKlXqkJ7Bbg5ZW3m6r_IiQKqCQgUE_SHpOkltfRSgsY-FpvzeffdM1FpeiYGtkcFMokaQRMxQrvZbD',
      description:
        'A formal dining space perfect for hosting memorable gatherings. A statement chandelier, a grand dining table, and luxurious upholstery come together to create a sophisticated and timeless design.',
    },
    {
      title: 'Outdoor Living Space',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuALfyG72R4q6ifx9b2h21eV8s3Xx6HbXbEj4KZPG_3jkNtSH3pYRVP3360MpytyC6suvQWI6ltsb3ZacU4_f4fiZmL-WfWnx0HIiH2w0KROrY0MG2u_kEfmoVPUZb0TpwFZGfggtCcv1504WQ5OD8kIbYzf6GEMrO1kLg6VZlPOWillhODvyUkZe42vinRHisBb0H9W6F_QdfhVRLg2Tsxfq-JVo6-TSUA2WrMj3s1eKUDwqL7WH8r19WxnqydDHKPSukhxNjlGq6MF',
      description:
        "An extension of the home into nature, this outdoor space features a custom-built deck, a cozy fire pit area, and comfortable all-weather seating. It's the perfect spot for alfresco dining or enjoying a quiet evening outdoors.",
    },
    {
      title: 'Kids Room Design',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDxf3u3xJAz8CBs1-i4l1-yOIXQQvGLfwOoz8l3wAOtnaGcNBlfddi5ORPPCkEekkbT5HKdPGmCw38yc6N6FA69ytRZXUSXeFJJ1--Yr9Vy3vWjYAgjXAOujnKZQ2066oTG0DP1KoeSEMbc-9QX3XysXM3mSpa5YPLsTnzA-OR5OgyAcM626FAzuulC-3Li7-OZUew9UgSDO2x1U1xYK39QsMRcTnGmVS8Kc5e1qZhjnUYUvBWvvisTAyh28d8TtqW5-OZYxZon7K0r',
      description:
        'A playful and imaginative space designed to grow with the child. This room includes a whimsical mural, smart storage solutions for toys and books, and a dedicated area for creative play and homework, fostering both fun and function.',
    },
  ]

  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0 })

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
    <section
      className="container mx-auto flex-grow px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24"
      ref={ref}
      id="projects"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h1
            variants={itemVariants}
            className="font-anton text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight"
          >
            Our Projects
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400"
          >
            Discover the spaces we've transformed with passion and precision.
          </motion.p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <ProjectCard
                title={project.title}
                imageUrl={project.imageUrl}
                description={project.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
