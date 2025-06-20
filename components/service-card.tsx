"use client"

import { motion } from "framer-motion"
import { Scale, Briefcase, Building, FileText, Scroll, Globe, ChevronRight } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  delay?: number
}

export default function ServiceCard({ title, description, icon, delay = 0 }: ServiceCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "scale":
        return <Scale className="h-6 w-6 text-gold" />
      case "briefcase":
        return <Briefcase className="h-6 w-6 text-gold" />
      case "building":
        return <Building className="h-6 w-6 text-gold" />
      case "file-text":
        return <FileText className="h-6 w-6 text-gold" />
      case "scroll":
        return <Scroll className="h-6 w-6 text-gold" />
      case "globe":
        return <Globe className="h-6 w-6 text-gold" />
      default:
        return <FileText className="h-6 w-6 text-gold" />
    }
  }

  return (
    <motion.div
      className="bg-charcoal rounded p-8 shadow-sm hover:shadow-md transition-shadow group border border-light-grey/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-6">{getIcon()}</div>
      <h3 className="text-xl font-bold text-light-grey mb-3">{title}</h3>
      <p className="text-light-grey/70 mb-6">{description}</p>
      <div className="flex items-center text-gold font-medium group-hover:translate-x-1 transition-transform">
        Learn More <ChevronRight className="h-4 w-4 ml-1" />
      </div>
    </motion.div>
  )
}
