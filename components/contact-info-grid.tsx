// components/contact-info-grid.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

// This component will be rendered client-side only via dynamic import
export default function ContactInfoGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Location Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gold p-5"
      >
        <MapPin className="h-5 w-5 text-charcoal/80 mb-3" />
        <h3 className="text-base font-bold mb-2">Abu Dhabi</h3>
        <p className="text-charcoal/70 text-xs">
          Al Sila Tower, ADGM Square
          <br />
          Al Maryah Island
        </p>
      </motion.div>

      {/* Call Us Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gold p-5"
      >
        <Phone className="h-5 w-5 text-charcoal/80 mb-3" />
        <h3 className="text-base font-bold mb-2">Call Us</h3>
        {/* No suppressHydrationWarning needed as it's client-only */}
        <p className="text-charcoal/70 text-xs">
          +971 2 123 4567
          <br />
          Mon-Fri, 8:30AM-5:30PM
        </p>
      </motion.div>

      {/* Email Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gold p-5 col-span-2"
      >
        <Mail className="h-5 w-5 text-charcoal/80 mb-3" />
        <h3 className="text-base font-bold mb-2">Email Us</h3>
        <p className="text-charcoal/70 text-xs">
          info@amarapartners.com
          <br />
          For general inquiries
        </p>
      </motion.div>
    </div>
  );
}