import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import HeroSection from './components/sections/Hero'
import ServicesSection from './components/sections/ServicesSection'
import OurStorySection from './components/sections/OurStorySection'
import ProjectsSection from './components/sections/ProjectsSection'
import DesignProcessSection from './components/sections/DesignProcessSection'
import WhyChooseUsSection from './components/sections/HomePageContent'
import Footer from './components/footer'
import ContactSection from './components/sections/ContactSection'
import VisitShowroomSection from './components/sections/VisitShowroomSection'

export default async function HomePage() {
  // const payloadConfig = await config
  // const payload = await getPayload({ config: payloadConfig })

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <OurStorySection />
      <ProjectsSection />
      <DesignProcessSection />
      <WhyChooseUsSection />
      <VisitShowroomSection />
      <ContactSection />
      <Footer />
    </>
  )
}
