"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function SidebarLogo() {
  return (
    <motion.div
      className="fixed left-2 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.8, duration: 0.8 }}
    >
      <Link href="/" className="flex flex-col items-center">
        <div className="vertical-text text-charcoal font-medium text-xl tracking-widest font-heading">
          AMARA
          <span className="text-blue-500 mx-1">&</span>
          PARTNERS
        </div>
      </Link>
      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          letter-spacing: 0.2em;
          line-height: 1.5;
        }
      `}</style>
    </motion.div>
  )
}
