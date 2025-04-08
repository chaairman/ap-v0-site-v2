import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-charcoal py-10">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/logo.png" alt="Amara & Partners" width={32} height={32} className="object-contain" />
              <span className="text-base font-bold">Amara & Partners</span>
            </div>
            <p className="text-charcoal/70 mb-4 pr-8 text-xs">
              A modern legal consultancy delivering innovative solutions with a commercial approach and regional
              expertise.
            </p>
            <div className="flex space-x-3">
              <Link href="#" className="text-charcoal/70 hover:text-blue-500 transition-colors">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-charcoal/70 hover:text-blue-500 transition-colors">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-charcoal/70 hover:text-blue-500 transition-colors">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-charcoal/70 hover:text-blue-500 transition-colors">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div className="col-span-6 md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="text-charcoal/70 hover:text-blue-500 transition-colors text-xs">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-charcoal/70 hover:text-blue-500 transition-colors text-xs">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-charcoal/70 hover:text-blue-500 transition-colors text-xs">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-charcoal/70 hover:text-blue-500 transition-colors text-xs">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-charcoal/70 hover:text-blue-500 transition-colors text-xs">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-charcoal/70 hover:text-blue-500 transition-colors text-xs">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/dispute-resolution"
                  className="text-charcoal/70 hover:text-blue-500 transition-colors text-xs"
                >
                  Dispute Resolution
                </Link>
              </li>
              <li>
                <Link
                  href="/services/corporate-commercial"
                  className="text-charcoal/70 hover:text-blue-500 transition-colors text-xs"
                >
                  Corporate & Commercial
                </Link>
              </li>
              <li>
                <Link
                  href="/services/projects-operations"
                  className="text-charcoal/70 hover:text-blue-500 transition-colors text-xs"
                >
                  Projects & Operations
                </Link>
              </li>
              <li>
                <Link
                  href="/services/specialized-regulatory"
                  className="text-charcoal/70 hover:text-blue-500 transition-colors text-xs"
                >
                  Specialized Regulatory
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Contact</h3>
            <p className="text-charcoal/70 mb-1 text-xs">Al Sila Tower, Abu Dhabi Global Market Square</p>
            <p className="text-charcoal/70 mb-3 text-xs">Al Maryah Island, Abu Dhabi, UAE</p>
            <p className="text-charcoal/70 mb-1 text-xs">+971 2 123 4567</p>
            <p className="text-charcoal/70 mb-3 text-xs">info@amarapartners.com</p>
          </div>
        </div>

        <div className="border-t border-charcoal/10 mt-8 pt-6 text-center text-charcoal/50 text-[10px]">
          <p>© {new Date().getFullYear()} Amara & Partners LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
