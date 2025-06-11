"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function VerticalLogo() {
  return (
    <motion.div
      className="fixed left-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.8, duration: 0.8 }}
    >
      <Link href="/" className="flex flex-col items-center">
        <div className="vertical-text text-light-grey font-serif text-xl tracking-widest">
          AMARA
          <span className="block my-2">&</span>
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
