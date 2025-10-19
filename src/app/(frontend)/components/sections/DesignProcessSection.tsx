'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Search, Layers, Construction, Handshake, BoxSelect } from 'lucide-react'

interface ProcessStepProps {
  icon: React.ReactNode
  step: string
  title: string
  description: string
  align: 'left' | 'right'
  isVisible: boolean
}

const ProcessStep = ({ icon, step, title, description, align, isVisible }: ProcessStepProps) => {
  const isRightAligned = align === 'right'

  const textContent = (
    <div
      className={`flex flex-col items-start transition-all duration-700 ${
        isVisible
          ? 'translate-x-0 opacity-100'
          : isRightAligned
            ? 'translate-x-12 opacity-0'
            : '-translate-x-12 opacity-0'
      } ${isRightAligned ? 'lg:items-end lg:text-right' : ''}`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-700 ${
          isVisible ? 'scale-100' : 'scale-0'
        }`}
      >
        {icon}
      </div>
      <div className="mt-4">
        <p className="text-sm font-bold uppercase tracking-wider text-primary">{step}</p>
        <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400">{description}</p>
      </div>
    </div>
  )

  const timelineGraphic = (
    <div className="relative hidden lg:block">
      <div
        className={`absolute top-0 flex h-full w-16 items-center transition-all duration-700 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-30'
        } ${isRightAligned ? '-left-8' : '-right-8'}`}
      >
        <div className="h-12 w-12 rounded-full bg-background-light dark:bg-background-dark ring-4 ring-primary"></div>
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16">
      {isRightAligned ? (
        <>
          {textContent}
          {timelineGraphic}
        </>
      ) : (
        <>
          {timelineGraphic}
          {textContent}
        </>
      )}
    </div>
  )
}

const DesignProcessSection = () => {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      icon: <Search size={32} />,
      step: 'Step 01',
      title: 'Consultation & Space Study',
      description:
        "We begin with an in-depth consultation to understand your needs, preferences, and budget. Our team conducts a thorough space study to assess the area's potential and challenges.",
    },
    {
      icon: <BoxSelect size={32} />,
      step: 'Step 02',
      title: 'Concept & 3D Visualization',
      description:
        'Based on the consultation, we develop a design concept and create detailed 3D visualizations. This allows you to see your future space and make informed decisions.',
    },
    {
      icon: <Layers size={32} />,
      step: 'Step 03',
      title: 'Material Selection & Production',
      description:
        'Once the concept is approved, we carefully select materials that align with the design and your budget. Our skilled craftsmen then begin production, ensuring quality and precision.',
    },
    {
      icon: <Construction size={32} />,
      step: 'Step 04',
      title: 'Installation & Finishing',
      description:
        'Our experienced team handles the installation process with meticulous attention to detail. We ensure every element is perfectly placed and finished to the highest standards.',
    },
    {
      icon: <Handshake size={32} />,
      step: 'Step 05',
      title: 'Handover & After-Care',
      description:
        'After the installation, we conduct a final handover to ensure your complete satisfaction. We also provide after-care support to address any questions or concerns.',
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'))
          setVisibleSteps((prev) => {
            const updated = [...prev]
            updated[index] = entry.isIntersecting
            return updated
          })
        })
      },
      { threshold: 0.3 },
    )

    const stepElements = containerRef.current?.querySelectorAll('[data-index]')
    stepElements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="container mx-auto px-4 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-anton text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Our Professional Design Process
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
          At A's Hub, we follow a meticulous design process to ensure your vision comes to life
          seamlessly. Here's how we transform your space:
        </p>
      </div>

      <div className="relative mt-20" ref={containerRef}>
        {/* The dashed vertical timeline bar */}
        <div
          className="absolute left-1/2 top-4 -z-10 hidden h-full w-px -translate-x-1/2 bg-transparent lg:block"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgb(203 213 225 / 0.5), rgb(203 213 225 / 0.5) 4px, transparent 4px, transparent 12px)',
            backgroundSize: '12px 12px',
          }}
        ></div>

        <div className="space-y-12 lg:space-y-24">
          {steps.map((step, index) => (
            <div key={step.step} data-index={index}>
              <ProcessStep
                align={index % 2 === 0 ? 'right' : 'left'}
                icon={step.icon}
                step={step.step}
                title={step.title}
                description={step.description}
                isVisible={visibleSteps[index] || false}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default DesignProcessSection
