"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ContactSection() {
  return (
    <section className="py-20 md:py-28 bg-white text-charcoal">
      <div className="container mx-auto px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-4">Contact Us</h2>
          <div className="w-16 h-1 bg-blue-500"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Our Office</h3>
              <p className="text-charcoal/70">
                Al Sila Tower, Abu Dhabi Global Market Square
                <br />
                Al Maryah Island, Abu Dhabi, UAE
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-start gap-4"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Phone className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="text-charcoal/70">+971 2 123 4567</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-start gap-4"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-charcoal/70">info@amarapartners.com</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/contact">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded">
              Get in Touch <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
