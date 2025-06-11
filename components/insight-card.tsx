"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface InsightCardProps {
  title: string
  category: string
  date: string
  image: string
  delay?: number
}

export default function InsightCard({ title, category, date, image, delay = 0 }: InsightCardProps) {
  return (
    <motion.div
      className="bg-charcoal rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-light-grey/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gold">{category}</span>
        <span className="text-sm text-light-grey/50">{date}</span>
      </div>
      <h3 className="text-xl font-bold text-light-grey mb-4">{title}</h3>
      <Link href="#" className="text-gold font-medium hover:underline flex items-center">
          Read More <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </motion.div>
  )
}
