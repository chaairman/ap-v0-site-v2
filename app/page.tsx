"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Search,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

// GSAP Imports
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Footer from "@/components/footer";
import SidebarLogo from "@/components/sidebar-logo";
// import VerticalLogo from "@/components/vertical-logo";

// Register GSAP ScrollTrigger plugin
// This needs to be done once, and it's safe to do it at the module level
// if guarded against server-side execution.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const animatedH3Ref = useRef<HTMLHeadingElement>(null); // Ref for the h3 to be animated by GSAP

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: servicesScrollProgress } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"],
  });

  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const servicesScale = useTransform(
    servicesScrollProgress,
    [0, 0.5],
    [0.95, 1]
  );
  const servicesOpacity = useTransform(
    servicesScrollProgress,
    [0, 0.3],
    [0.5, 1]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [scrollYVal, setScrollYVal] = useState(0);
  const navThreshold = 100;
  const navAnimationDistance = 200;

  useEffect(() => {
    const handleScroll = () => {
      setScrollYVal(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const animationProgress = Math.min(
    Math.max((scrollYVal - navThreshold) / navAnimationDistance, 0),
    1
  );

  // GSAP Text Animation Logic
  useEffect(() => {
    const h3Element = animatedH3Ref.current;

    if (h3Element && h3Element.textContent) {
      const originalText = h3Element.textContent;
      const words = originalText.split(/\s+/).filter(word => word.length > 0);
      
      h3Element.innerHTML = ''; // Clear original content

      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.classList.add('anim-word');
        h3Element.appendChild(span);
        if (index < words.length - 1) {
          h3Element.appendChild(document.createTextNode(' '));
        }
      });

      const animWords = h3Element.querySelectorAll('.anim-word');

      if (animWords.length > 0) {
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: h3Element,
              start: "top 85%", 
              end: "bottom 60%", 
              scrub: 0.3,
              // markers: true, // For debugging
            },
          });

          tl.fromTo(
            h3Element,
            { autoAlpha: 0.6 }, // Initial state of the whole h3
            { autoAlpha: 1, duration: 0.5, ease: "none" },
            0 
          );

          tl.fromTo(
            animWords,
            { // Initial state for each word
              autoAlpha: 0,
              y: 25,
              color: "hsla(222, 84%, 4.9%, 0.5)", // Faded charcoal
            },
            { // Target state for each word
              autoAlpha: 1,
              y: 0,
              color: "hsl(222.2, 84%, 4.9%)", // Full charcoal
              duration: 0.6,
              stagger: 0.05,
              ease: "circ.out",
            },
            0 // Start word animation at the same time as the sentence fade
          );
        }, h3Element); 

        return () => ctx.revert(); // Cleanup
      }
    }
  }, []);


  return (
    <main className="relative overflow-x-hidden">
      {/* Initial Loading Animation */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-blue-500"
        initial={{ x: 0 }}
        animate={{ x: isLoading ? 0 : "100%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isLoading ? 1 : 0, scale: isLoading ? 1 : 1.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-40 h-40 md:w-60 md:h-60"
        >
          <Image
            src="/logo.png"
            alt="Amara & Partners"
            width={240}
            height={240}
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Sidebar Logo */}
      <SidebarLogo />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-8 py-5 flex items-center">
          <div className="flex-1 md:hidden">
            <Link href="/" className="flex items-center space-x-2 z-20">
              <Image
                src="/logo.png"
                alt="Amara & Partners"
                width={32}
                height={32}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <motion.nav
             className="hidden md:flex items-center space-x-10 justify-center flex-1"
             initial={{ x: 0, opacity: 1 }}
             animate={{
               x: animationProgress * 100,
               opacity: 1 - animationProgress,
               pointerEvents: animationProgress >= 0.9 ? "none" : "auto",
             }}
             transition={{ duration: 0.1 }}
          >
             <Link href="/about-us" className="text-charcoal text-xs uppercase tracking-wider hover:text-blue-500 transition-colors">About Us</Link>
             <Link href="/services" className="text-charcoal text-xs uppercase tracking-wider hover:text-blue-500 transition-colors">Services</Link>
             <Link href="/team" className="text-charcoal text-xs uppercase tracking-wider hover:text-blue-500 transition-colors">Our Team</Link>
             <Link href="/insights" className="text-charcoal text-xs uppercase tracking-wider hover:text-blue-500 transition-colors">Insights</Link>
             <Link href="/careers" className="text-charcoal text-xs uppercase tracking-wider hover:text-blue-500 transition-colors">Careers</Link>
             <Link href="/contact" className="text-charcoal text-xs uppercase tracking-wider hover:text-blue-500 transition-colors">Contact</Link>
          </motion.nav>

          {/* Search Icon */}
          <motion.div
            className="flex items-center justify-end"
             initial={{ opacity: 1 }}
             animate={{
               opacity: 1 - animationProgress,
               pointerEvents: animationProgress >= 0.9 ? "none" : "auto",
             }}
             transition={{ duration: 0.1 }}
          >
            <button className="text-charcoal p-2">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </button>
          </motion.div>

          {/* Desktop Hamburger Menu */}
           <motion.div
             className="hidden md:block ml-4"
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{
               opacity: animationProgress,
               scale: 0.8 + 0.2 * animationProgress,
               pointerEvents: animationProgress <= 0.1 ? "none" : "auto",
             }}
             transition={{ duration: 0.1 }}
           >
            <Sheet>
              <SheetTrigger asChild>
                 <Button variant="ghost" size="icon" className="text-charcoal relative h-10 w-10">
                   <motion.span className="absolute h-[2px] w-5 bg-charcoal/90" initial={{ opacity: 0, y: -8 }} animate={{ opacity: animationProgress, y: -4 }} transition={{ duration: 0.2, delay: 0.1 }}/>
                   <motion.span className="absolute h-[2px] w-5 bg-charcoal/90" initial={{ opacity: 0 }} animate={{ opacity: animationProgress }} transition={{ duration: 0.2, delay: 0.2 }}/>
                   <motion.span className="absolute h-[2px] w-5 bg-charcoal/90" initial={{ opacity: 0, y: 8 }} animate={{ opacity: animationProgress, y: 4 }} transition={{ duration: 0.2, delay: 0.3 }}/>
                   <span className="sr-only">Open menu</span>
                 </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white text-charcoal">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                    <Image src="/logo.png" alt="Amara & Partners" width={40} height={40} className="object-contain"/>
                    <SheetTrigger asChild><Button variant="ghost" size="icon" className="text-charcoal"><X className="h-6 w-6" /><span className="sr-only">Close menu</span></Button></SheetTrigger>
                  </div>
                  <nav className="flex flex-col space-y-6 text-lg">
                    <Link href="/about-us" className="py-2 border-b border-charcoal/20 flex justify-between items-center">About Us <ChevronRight className="h-5 w-5 opacity-50" /></Link>
                    <Link href="/services" className="py-2 border-b border-charcoal/20 flex justify-between items-center">Services <ChevronRight className="h-5 w-5 opacity-50" /></Link>
                    <Link href="/team" className="py-2 border-b border-charcoal/20 flex justify-between items-center">Our Team <ChevronRight className="h-5 w-5 opacity-50" /></Link>
                    <Link href="/insights" className="py-2 border-b border-charcoal/20 flex justify-between items-center">Insights <ChevronRight className="h-5 w-5 opacity-50" /></Link>
                    <Link href="/careers" className="py-2 border-b border-charcoal/20 flex justify-between items-center">Careers <ChevronRight className="h-5 w-5 opacity-50" /></Link>
                    <Link href="/contact" className="py-2 border-b border-charcoal/20 flex justify-between items-center">Contact <ChevronRight className="h-5 w-5 opacity-50" /></Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </motion.div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
               <SheetTrigger asChild>
                 <Button variant="ghost" size="icon">
                   <Menu className="h-5 w-5 text-charcoal" />
                   <span className="sr-only">Open menu</span>
                 </Button>
               </SheetTrigger>
              <SheetContent side="right" className="bg-white text-charcoal">
                 <div className="flex flex-col h-full">
                   <div className="flex justify-between items-center mb-8">
                     <Image src="/logo.png" alt="Amara & Partners" width={40} height={40} className="object-contain"/>
                     <SheetTrigger asChild><Button variant="ghost" size="icon" className="text-charcoal"><X className="h-6 w-6" /><span className="sr-only">Close menu</span></Button></SheetTrigger>
                   </div>
                   <nav className="flex flex-col space-y-6 text-lg">
                     <Link href="/about-us" className="py-2 border-b border-charcoal/20 flex justify-between items-center">About Us <ChevronRight className="h-5 w-5 opacity-50" /></Link>
                     <Link href="/services" className="py-2 border-b border-charcoal/20 flex justify-between items-center">Services <ChevronRight className="h-5 w-5 opacity-50" /></Link>
                     <Link href="/team" className="py-2 border-b border-charcoal/20 flex justify-between items-center">Our Team <ChevronRight className="h-5 w-5 opacity-50" /></Link>
                     <Link href="/insights" className="py-2 border-b border-charcoal/20 flex justify-between items-center">Insights <ChevronRight className="h-5 w-5 opacity-50" /></Link>
                     <Link href="/careers" className="py-2 border-b border-charcoal/20 flex justify-between items-center">Careers <ChevronRight className="h-5 w-5 opacity-50" /></Link>
                     <Link href="/contact" className="py-2 border-b border-charcoal/20 flex justify-between items-center">Contact <ChevronRight className="h-5 w-5 opacity-50" /></Link>
                   </nav>
                 </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white"
      >
        <div className="container mx-auto px-8 relative z-10 mt-16">
          <div className="max-w-4xl mx-auto">
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.8 }} className="mb-4">
               <div className="flex items-center">
                 <div className="w-1 h-16 bg-blue-500 mr-4"></div>
                 <span className="text-blue-500 uppercase tracking-wider text-xs">LEGAL EXCELLENCE</span>
               </div>
             </motion.div>
             <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-charcoal mb-6 tracking-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4, duration: 0.8 }}> Amara <span className="text-blue-500">&</span> Partners </motion.h1>
             <motion.p className="text-base text-charcoal/70 mb-12 max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.6, duration: 0.8 }}> A modern legal consultancy redefining excellence in Abu Dhabi's legal landscape </motion.p>
             <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8, duration: 0.8 }}>
               <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded"> Our Services <ChevronRight className="h-4 w-4 ml-2" /> </Button>
               <Button variant="outline" className="border-charcoal/20 text-charcoal hover:bg-charcoal/5 px-8 py-6 rounded"> Contact Us </Button>
             </motion.div>
          </div>
        </div>
         <motion.div className="absolute bottom-10 left-1/2 transform -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 0.8 }}>
           <div className="flex flex-col items-center text-charcoal/70">
             <span className="text-xs mb-2">Discover More</span>
             <ChevronDown className="h-5 w-5 animate-bounce" />
           </div>
         </motion.div>
      </section>

      {/* About Us Section */}
      <section className="relative py-20 md:py-28 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-12 gap-8">
             <div className="col-span-12 md:col-span-3">
               <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="sticky top-32">
                 <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal mb-2">ABOUT US</h2>
                 <div className="w-12 h-1 bg-blue-500"></div>
               </motion.div>
             </div>
             <div className="col-span-12 md:col-span-9">
               {/* This is the h3 that will be animated by GSAP */}
               <h3
                 ref={animatedH3Ref}
                 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-8 leading-tight"
                 style={{ opacity: 0.6 }} // Initial opacity for FOUC prevention
               >
                 See why we are uniquely equipped to support global businesses in a fast-changing world.
               </h3>
               <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-2xl">
                 <p className="text-base text-charcoal/70 mb-8"> Founded on principles of innovation and excellence, Amara & Partners LLC has established itself as a leading legal consultancy in Abu Dhabi, serving clients across the region and beyond. </p>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
                   <Link href="/about-us" className="inline-flex items-center text-blue-500 font-medium group"> <span className="mr-2 group-hover:mr-3 transition-all">READ MORE</span> <span className="w-5 h-[2px] bg-blue-500 group-hover:w-8 transition-all"></span> </Link>
                 </motion.div>
               </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="relative py-20 md:py-28 bg-white">
         <div className="container mx-auto px-8">
           <div className="grid grid-cols-12 gap-8">
             <div className="col-span-12 md:col-span-5 lg:col-span-4">
               <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-blue-500 text-white p-6 md:p-8 rounded-sm" style={{ position: "sticky", top: "32px", }}>
                 <span className="text-xs uppercase tracking-wider mb-3 block">EXPERTISE</span>
                 <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Explore our capabilities</h2>
                 <p className="text-white/80 text-xs mb-6 leading-relaxed"> Our teams are known for the quality of their legal thinking – and for creating cutting-edge products, services and technologies. </p>
                 <Link href="/services" className="inline-flex items-center text-white uppercase text-xs tracking-wider group"> <span className="mr-2 group-hover:mr-3 transition-all">ALL EXPERTISE</span> <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" /> </Link>
               </motion.div>
             </div>
             <div className="col-span-12 md:col-span-7 lg:col-span-8">
               <div className="space-y-4">
                  <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="border-b border-gray-200 pb-4"> <div className="flex justify-between items-start"> <div> <h3 className="text-lg md:text-xl font-bold text-charcoal mb-1">Corporate & Commercial</h3> <p className="text-charcoal/70 text-xs mb-0 pr-12 leading-relaxed"> We provide market-leading companies, investment funds and financial institutions with top-tier corporate and M&A advice in every jurisdiction. </p> </div> <Link href="/services/corporate-commercial" className="flex-shrink-0 mt-1"> <ArrowRight className="h-4 w-4 text-charcoal/50 hover:text-blue-500 transition-colors" /> </Link> </div> </motion.div>
                  <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="border-b border-gray-200 pb-4"> <div className="flex justify-between items-start"> <div> <h3 className="text-lg md:text-xl font-bold text-charcoal mb-1">Disputes</h3> <p className="text-charcoal/70 text-xs mb-0 pr-12 leading-relaxed"> Our lawyers have vast experience litigating, arbitrating, investigating and resolving disputes across the world. We are ready to help, whatever the crisis. </p> </div> <Link href="/services/disputes" className="flex-shrink-0 mt-1"> <ArrowRight className="h-4 w-4 text-charcoal/50 hover:text-blue-500 transition-colors" /> </Link> </div> </motion.div>
                   <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="border-b border-gray-200 pb-4"> <div className="flex justify-between items-start"> <div> <h3 className="text-lg md:text-xl font-bold text-charcoal mb-1">Finance</h3> <p className="text-charcoal/70 text-xs mb-0 pr-12 leading-relaxed"> Our finance team is renowned as one of the strongest and deepest around, with more than 1,000 attorneys located in all the major financial centers. </p> </div> <Link href="/services/finance" className="flex-shrink-0 mt-1"> <ArrowRight className="h-4 w-4 text-charcoal/50 hover:text-blue-500 transition-colors" /> </Link> </div> </motion.div>
                   <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="border-b border-gray-200 pb-4"> <div className="flex justify-between items-start"> <div> <h3 className="text-lg md:text-xl font-bold text-charcoal mb-1">Capital Markets</h3> <p className="text-charcoal/70 text-xs mb-0 pr-12 leading-relaxed"> We set precedents in the capital markets advising on all debt and equity products, from investment-grade and high-yield debt offerings to IPOs. </p> </div> <Link href="/services/capital-markets" className="flex-shrink-0 mt-1"> <ArrowRight className="h-4 w-4 text-charcoal/50 hover:text-blue-500 transition-colors" /> </Link> </div> </motion.div>
                   <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} className="border-b border-gray-200 pb-4"> <div className="flex justify-between items-start"> <div> <h3 className="text-lg md:text-xl font-bold text-charcoal mb-1">Advisory & Regulatory</h3> <p className="text-charcoal/70 text-xs mb-0 pr-12 leading-relaxed"> Our public company, corporate governance, employment, and regulatory attorneys act as trusted advisors to our clients on their most sensitive issues. </p> </div> <Link href="/services/advisory-regulatory" className="flex-shrink-0 mt-1"> <ArrowRight className="h-4 w-4 text-charcoal/50 hover:text-blue-500 transition-colors" /> </Link> </div> </motion.div>
                   <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }} className="border-b border-gray-200 pb-4"> <div className="flex justify-between items-start"> <div> <h3 className="text-lg md:text-xl font-bold text-charcoal mb-1">Innovation</h3> <p className="text-charcoal/70 text-xs mb-0 pr-12 leading-relaxed"> We are a pioneer in our industry, committed to continual advancement and finding innovative ways to exceed our clients' expectations. </p> </div> <Link href="/services/innovation" className="flex-shrink-0 mt-1"> <ArrowRight className="h-4 w-4 text-charcoal/50 hover:text-blue-500 transition-colors" /> </Link> </div> </motion.div>
               </div>
             </div>
           </div>
         </div>
      </section>

      {/* Insights Section */}
      <section className="relative py-20 md:py-28 bg-white">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
             <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-4 md:mb-0" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}> Spotlight on our news and insights </motion.h2>
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}> <Link href="/insights" className="inline-flex items-center text-blue-500 uppercase text-xs tracking-wider group"> <span className="mr-2 group-hover:mr-3 transition-all">VIEW ALL NEWS AND INSIGHTS</span> <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" /> </Link> </motion.div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="relative aspect-w-16 aspect-h-9 mb-6 bg-gray-100 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=1000"
                    alt="Featured insight"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                 <span className="text-xs text-charcoal/70 mb-1 block">Energy</span>
                 <h3 className="text-2xl md:text-3xl font-bold text-charcoal mb-3"> Amara & Partners strengthens U.S. energy and energy transition offering with two strategic partner hires </h3>
                 <div className="flex items-center mt-4">
                   <div className="h-5 w-1 bg-blue-500 mr-3"></div>
                   <span className="uppercase text-xs font-medium">FIRM NEWS</span>
                   <span className="text-charcoal/50 ml-auto text-xs">7 Apr 2025</span>
                 </div>
              </motion.div>
            </div>

            <div className="col-span-12 md:col-span-5">
              <div className="space-y-6">
                {/* Insight Item 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-12 gap-4 items-start"
                >
                  <div className="col-span-5">
                    <div className="relative aspect-w-1 aspect-h-1 bg-gray-100 overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="AI insight"
                        fill
                        className="object-cover"
                         sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
                      />
                    </div>
                  </div>
                  <div className="col-span-7">
                     <span className="text-xs text-charcoal/70 mb-1 block">Artificial Intelligence</span>
                     <h3 className="text-base font-bold text-charcoal mb-2"> Amara & Partners to roll out agentic AI agents targeting complex legal workflows </h3>
                     <div className="flex items-center mt-3">
                       <div className="h-4 w-1 bg-blue-500 mr-2"></div>
                       <span className="uppercase text-[10px] font-medium">FIRM NEWS</span>
                       <span className="text-charcoal/50 ml-auto text-[10px]">6 Apr 2025</span>
                     </div>
                  </div>
                </motion.div>

                {/* Insight Item 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="grid grid-cols-12 gap-4 items-start"
                >
                  <div className="col-span-5">
                    <div className="relative aspect-w-1 aspect-h-1 bg-gray-100 overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Global trends"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
                      />
                    </div>
                  </div>
                  <div className="col-span-7">
                     <span className="text-xs text-charcoal/70 mb-1 block">Regulatory</span>
                     <h3 className="text-base font-bold text-charcoal mb-2"> Global trends in merger control enforcement </h3>
                     <div className="flex items-center mt-3">
                       <div className="h-4 w-1 bg-green-700 mr-2"></div>
                       <span className="uppercase text-[10px] font-medium">REPORT</span>
                       <span className="text-charcoal/50 ml-auto text-[10px]">27 Feb 2025</span>
                     </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
       <section className="py-20 md:py-28 bg-blue-500 text-white">
         <div className="container mx-auto px-8">
           <div className="grid grid-cols-12 gap-8">
             <div className="col-span-12 md:col-span-6">
               <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10">
                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5"> Let's start a <br /> conversation </h2>
                 <p className="text-white/80 text-xs mb-8 max-w-md leading-relaxed"> Whether you have a complex legal challenge or are looking for strategic advice, our team is ready to help. </p>
                 <div className="flex flex-wrap gap-6">
                   <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}> <Link href="/contact"> <Button className="bg-white text-blue-500 hover:bg-blue-50 px-6 py-5 rounded-none"> Contact Us <ArrowRight className="h-4 w-4 ml-2" /> </Button> </Link> </motion.div>
                   <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}> <Link href="/locations"> <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-5 rounded-none"> Our Locations </Button> </Link> </motion.div>
                 </div>
               </motion.div>
             </div>
             <div className="col-span-12 md:col-span-6 relative">
               <div className="grid grid-cols-2 gap-4">
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-blue-500 p-5"> <MapPin className="h-5 w-5 text-white/80 mb-3" /> <h3 className="text-base font-bold mb-2">Abu Dhabi</h3> <p className="text-white/70 text-xs"> Al Sila Tower, ADGM Square <br /> Al Maryah Island </p> </motion.div>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-blue-500 p-5"> <Phone className="h-5 w-5 text-white/80 mb-3" /> <h3 className="text-base font-bold mb-2">Call Us</h3> <p className="text-white/70 text-xs"> +971 2 123 4567 <br /> Mon-Fri, 8:30AM-5:30PM </p> </motion.div>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-blue-500 p-5 col-span-2"> <Mail className="h-5 w-5 text-white/80 mb-3" /> <h3 className="text-base font-bold mb-2">Email Us</h3> <p className="text-white/70 text-xs"> info@amarapartners.com <br /> For general inquiries </p> </motion.div>
               </div>
             </div>
           </div>
         </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}