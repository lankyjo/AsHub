'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { easeOut, motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageSquare, Phone, Mail, CheckCircle2 } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface ContactInfoItemProps {
  icon: React.ReactNode
  title: string
  value: string
  href: string
}

const ContactInfoItem = ({ icon, title, value, href }: ContactInfoItemProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Link href={href} className="flex items-center gap-4 group">
        <motion.div
          className="flex items-center justify-center size-12 rounded-lg bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          {icon}
        </motion.div>
        <div>
          <p className="font-bold text-background-dark dark:text-background-light">{title}</p>
          <p className="text-sm text-primary group-hover:underline">{value}</p>
        </div>
      </Link>
    </motion.div>
  )
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  projectType: z.string().min(1, { message: 'Please select a project type.' }),
  budget: z.string().min(1, { message: 'Please select a budget range.' }),
  message: z.string().optional(),
})

const ContactForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectType: '',
      budget: '',
      message: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Form submitted with:', values)
    onSuccess()

    form.reset({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      budget: '',
      message: '',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    className="border border-primary/30 focus-visible:ring-0 focus-visible:border-primary transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="border border-primary/30 focus-visible:ring-0 focus-visible:border-primary transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your phone number"
                    {...field}
                    className="border border-primary/30 focus-visible:ring-0 focus-visible:border-primary transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="border border-primary/30 focus:ring-0 w-full focus:border-primary transition-colors">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="residential">Residential Design</SelectItem>
                    <SelectItem value="commercial">Commercial Design</SelectItem>
                    <SelectItem value="furniture">Furniture Sourcing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="border border-primary/30 focus:ring-0 focus:border-primary transition-colors w-full">
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="<500k">Under ₦500,000</SelectItem>
                    <SelectItem value="500k-1m">₦500,000 - ₦1,000,000</SelectItem>
                    <SelectItem value="1m-5m">₦1,000,000 - ₦5,000,000</SelectItem>
                    <SelectItem value="5m-10m">₦5,000,000 - ₦10,000,000</SelectItem>
                    <SelectItem value=">10m">₦10,000,000+</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your project"
                    {...field}
                    rows={4}
                    className="border border-primary/30 focus-visible:ring-0 focus-visible:border-primary transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button type="submit" className="w-full font-bold">
            Book Consultation
          </Button>
        </motion.div>
      </form>
    </Form>
  )
}

const ContactSection = () => {
  const [showModal, setShowModal] = useState(false)

  // [ARRAYS MARKED] - contactMethods array with 3 contact methods
  const contactMethods = [
    {
      icon: <MessageSquare className="text-primary" size={24} />,
      title: 'WhatsApp',
      value: 'Chat with us',
      href: '#',
    },
    {
      icon: <Phone className="text-primary" size={24} />,
      title: 'Call Us',
      value: '+234-812-772-5814',
      href: 'tel:+2348127725814',
    },
    {
      icon: <Mail className="text-primary" size={24} />,
      title: 'Email Us',
      value: 'ashubluxuryconcepts@gmail.com',
      href: 'mailto:ashubluxuryconcepts@gmail.com',
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
    <section className="flex-grow" id="contact" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <motion.div
            className="flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.h2
              variants={itemVariants}
              className="font-anton text-4xl sm:text-5xl font-extrabold text-background-dark dark:text-background-light tracking-tight"
            >
              Let's Design Your Space.
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-lg text-background-dark/70 dark:text-background-light/70"
            >
              Fill out the form to book a consultation, or reach out to us directly...
            </motion.p>
            <motion.div
              variants={containerVariants}
              className="mt-12 space-y-6"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {contactMethods.map((method) => (
                <ContactInfoItem key={method.title} {...method} />
              ))}
              <motion.div
                variants={itemVariants}
                className="border-t border-primary/20 dark:border-primary/30 pt-6"
              >
                <p className="text-sm font-medium text-background-dark dark:text-background-light">
                  Business Hours
                </p>
                <p className="text-sm text-background-dark/70 dark:text-background-light/70">
                  Monday - Friday, 9:00 AM - 6:00 PM
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column (Form) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Card className="rounded-sm shadow-2xl bg-background">
              <CardHeader>
                <CardTitle className="text-xl">Book a Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm onSuccess={() => setShowModal(true)} />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* --- Success Modal --- */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md text-center">
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={showModal ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
              <CheckCircle2 className="text-green-500 size-16 mb-3" />
            </motion.div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">Thank You!</DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                Your quote request has been submitted successfully.
              </DialogDescription>
            </DialogHeader>
            <p className="mt-3 text-sm text-muted-foreground">
              A quote will be sent to your <strong>email</strong> and/or <strong>WhatsApp</strong>{' '}
              as soon as possible.
            </p>
            <motion.div className="mt-6" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => setShowModal(false)}>Close</Button>
            </motion.div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default ContactSection
