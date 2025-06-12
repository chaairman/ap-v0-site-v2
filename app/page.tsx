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
import { SplitText } from "gsap/SplitText";

// SplitType import
import SplitType from "split-type";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Footer from "@/components/footer";
import SidebarLogo from "@/components/sidebar-logo";
// import VerticalLogo from "@/components/vertical-logo";
import { CurvedPath } from "@/curved-path";
import { HeroSvgPaths } from "@/components/hero-svg-paths";
import LogoSvg from "@/components/logo-svg";

// Register GSAP plugins
// This needs to be done once, and it's safe to do it at the module level
// if guarded against server-side execution.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

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

  // Create a custom animation progress value for services items
  const servicesItemsProgress = useTransform(
    servicesScrollProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
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

  // SplitType Animation Logic
  useEffect(() => {
    if (typeof window === "undefined") return;

    // SplitType text animation
    const splitTypes = document.querySelectorAll('.reveal-type');

    splitTypes.forEach((char, i) => {
      const bg = char.getAttribute('data-bg-color') || 'hsla(222, 84%, 4.9%, 0.5)';
      const fg = char.getAttribute('data-fg-color') || 'hsl(222.2, 84%, 4.9%)';

      const text = new SplitType(char as HTMLElement, { types: ['words', 'chars'] });

      // Apply white-space: nowrap to each word to prevent word breaking
      if (text.words) {
        text.words.forEach(word => {
          (word as HTMLElement).style.whiteSpace = 'nowrap';
          (word as HTMLElement).style.display = 'inline-block';
        });
      }

      gsap.fromTo(text.chars, 
        {
          color: bg,
          opacity: 0,
        },
        {
          color: fg,
          opacity: 1,
          duration: 0.3,
          stagger: 0.02,
          scrollTrigger: {
            trigger: char,
            start: 'top 80%',
            end: 'top 65%',
            scrub: true,
            markers: false,
            toggleActions: 'play play reverse reverse'
          }
        }
      );
    });

    // Hero text scroll-based gold fill animation
    const heroTextElement = document.getElementById('hero-excellence-text');
    if (heroTextElement) {
      const heroSplit = new SplitType(heroTextElement, { types: ['chars'] });
      
      if (heroSplit.chars) {
        // Set initial state - all characters start as white
        gsap.set(heroSplit.chars, { 
          color: 'white'
        });

        // Create the scroll-triggered animation that starts from page top
        ScrollTrigger.create({
          trigger: "body",
          start: "top top", // Start immediately when page loads
          end: "10% top", // Complete by 15% scroll
          scrub: 1, // Smooth scrubbing tied to scroll position
          markers: false, // Set to true for debugging
          onUpdate: (self) => {
            // Calculate how many characters should be gold based on scroll progress
            const progress = self.progress;
            const totalChars = heroSplit.chars!.length;
            const charsToFill = Math.floor(progress * totalChars);
            
            // Fill characters progressively
            heroSplit.chars!.forEach((char, index) => {
              if (index < charsToFill) {
                gsap.set(char, { color: '#DBCDAE' }); // Gold color from Tailwind config
              } else {
                gsap.set(char, { color: 'white' }); // White
              }
            });
          }
        });
      }
    }
  }, []);

  return (
    <main className="relative overflow-x-hidden bg-charcoal">
      <HeroSvgPaths />
      {/* Curved Path Background */}
      {/* <CurvedPath /> */}
      
      {/* Initial Loading Animation */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gold"
        initial={{ x: 0 }}
        animate={{ x: isLoading ? 0 : "100%" }}
        transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1], delay: 1 }}
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



      {/* Hero Section - Two Column Layout */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex overflow-hidden"
      >
        {/* Left Column - Main Content */}
        <div className="w-[65%] lg:w-[70%] bg-charcoal flex items-center justify-center relative z-10">
          {/* Navigation - Inside Left Column */}
          <header className="fixed top-0 left-0 w-[65%] lg:w-[70%] z-40 bg-transparent">
            <div className="flex items-center justify-between py-6">
              {/* Brand Logo - Far Left */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.8 }}
                className="flex items-center ml-[2vw]"
              >
                <LogoSvg className="h-16 w-auto" />
              </motion.div>

              {/* Desktop Navigation - Right Side */}
              <motion.nav
                className="hidden md:flex items-center space-x-8 mr-[2vw]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.8 }}
              >
                <Link href="/about-us" className="text-white text-sm uppercase tracking-wider hover:text-gold transition-colors">
                  About Us
                </Link>
                <Link href="/services" className="text-white text-sm uppercase tracking-wider hover:text-gold transition-colors">
                  Services
                </Link>
                <Link href="/team" className="text-white text-sm uppercase tracking-wider hover:text-gold transition-colors">
                  Our Team
                </Link>
                <Link href="/insights" className="text-white text-sm uppercase tracking-wider hover:text-gold transition-colors">
                  Insights
                </Link>
                <Link href="/careers" className="text-white text-sm uppercase tracking-wider hover:text-gold transition-colors">
                  Careers
                </Link>
                <Link href="/contact" className="text-white text-sm uppercase tracking-wider hover:text-gold transition-colors">
                  Contact
                </Link>
              </motion.nav>

              {/* Mobile Navigation */}
              <div className="md:hidden mr-[2vw]">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6 text-white" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-charcoal text-light-grey">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-center mb-8">
                        <Image src="/logo.png" alt="Amara & Partners" width={40} height={40} className="object-contain"/>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-light-grey">
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close menu</span>
                          </Button>
                        </SheetTrigger>
                      </div>
                      <nav className="flex flex-col space-y-6 text-lg">
                        <Link href="/about-us" className="py-2 border-b border-light-grey/20 flex justify-between items-center">
                          About Us <ChevronRight className="h-5 w-5 opacity-50" />
                        </Link>
                        <Link href="/services" className="py-2 border-b border-light-grey/20 flex justify-between items-center">
                          Services <ChevronRight className="h-5 w-5 opacity-50" />
                        </Link>
                        <Link href="/team" className="py-2 border-b border-light-grey/20 flex justify-between items-center">
                          Our Team <ChevronRight className="h-5 w-5 opacity-50" />
                        </Link>
                        <Link href="/insights" className="py-2 border-b border-light-grey/20 flex justify-between items-center">
                          Insights <ChevronRight className="h-5 w-5 opacity-50" />
                        </Link>
                        <Link href="/careers" className="py-2 border-b border-light-grey/20 flex justify-between items-center">
                          Careers <ChevronRight className="h-5 w-5 opacity-50" />
                        </Link>
                        <Link href="/contact" className="py-2 border-b border-light-grey/20 flex justify-between items-center">
                          Contact <ChevronRight className="h-5 w-5 opacity-50" />
                        </Link>
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </header>
          <div className="max-w-4xl mx-auto px-8 py-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 2.6, duration: 0.8 }} 
              className="mb-8"
            >
              <p className="font-body text-base md:text-lg text-white/90 leading-relaxed max-w-3xl flex items-start">
                <span className="text-gold text-base md:text-lg font-light mr-[4vw] flex-shrink-0">/</span>
                <span>At Amara & Partners, we transcend traditional legal practice. We are architects of innovative legal solutions, meticulously crafted for Abu Dhabi's dynamic landscape, driving clarity and delivering outcomes that redefine excellence for our clients.</span>
              </p>
            </motion.div>
            
            {/* Bottom-left tagline */}
            <motion.div 
              ref={heroTextRef}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 3.0, duration: 0.8 }} 
              className="absolute bottom-16 left-12"
            >
              <div className="font-heading text-7xl md:text-8xl lg:text-8xl font-bold leading-tight">
                <div className="text-gold">The future of law.</div>
                <div id="hero-excellence-text" className="text-white">Excellence, redefined.</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[35%] lg:w-[30%] relative bg-transparent z-10">
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative py-20 md:py-28 bg-transparent">
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid grid-cols-12 gap-8">
             <div className="col-span-12 md:col-span-1">
               <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="sticky top-32">
                 <h2 className="text-sm font-heading font-bold uppercase tracking-wider text-light-grey mb-2">ABOUT US</h2>
                 <div className="w-12 h-1 bg-gold"></div>
               </motion.div>
             </div>
             <div className="col-span-12 md:col-span-9">
               {/* This is the h3 that will be animated by SplitType */}
               <h3
                 className="reveal-type font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-light-grey mb-8 leading-tight"
                 data-bg-color="hsla(45, 25%, 72%, 0.5)"
                 data-fg-color="hsl(45, 25%, 72%)"
               >
                 See why we are uniquely equipped to support global businesses in a fast-changing world.
               </h3>
               <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-2xl">
                 <p className="font-body text-base text-light-grey/70 mb-8"> Founded on principles of innovation and excellence, Amara & Partners LLC has established itself as a leading legal consultancy in Abu Dhabi, serving clients across the region and beyond. </p>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
                   <Link href="/about-us" className="inline-flex items-center text-gold font-medium font-body group"> <span className="mr-2 group-hover:mr-3 transition-all">READ MORE</span> <span className="w-5 h-[2px] bg-gold group-hover:w-8 transition-all"></span> </Link>
                 </motion.div>
               </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="relative py-20 md:py-28 bg-transparent">
         <div className="container mx-auto px-8">
           <div className="grid grid-cols-12 gap-8">
             <div className="col-span-12 md:col-span-4 lg:col-span-3 md:col-start-1 lg:col-start-1">
               <motion.div 
                 style={{ 
                   opacity: useTransform(servicesItemsProgress, [0, 1], [0, 1]),
                   y: useTransform(servicesItemsProgress, [0, 1], [20, 0]),
                   position: "sticky", 
                   top: "32px"
                 }}
                 transition={{ duration: 0.6 }} 
                 className="bg-gold text-charcoal p-6 md:p-8 rounded-sm" 
               >
                 <span className="text-xs uppercase tracking-wider mb-3 block font-body">EXPERTISE</span>
                 <h2 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold mb-4">Explore our capabilities</h2>
                 <p className="text-charcoal/80 text-xs mb-6 leading-relaxed font-body"> Our teams are known for the quality of their legal thinking – and for creating cutting-edge products, services and technologies. </p>
                 <Link href="/services" className="inline-flex items-center text-charcoal uppercase text-xs tracking-wider font-body group"> <span className="mr-2 group-hover:mr-3 transition-all">ALL EXPERTISE</span> <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" /> </Link>
               </motion.div>
             </div>
             <div className="col-span-12 md:col-span-7 lg:col-span-7 bg-transparent">
               <div className="space-y-2">
                  <motion.div 
                    style={{ 
                      opacity: useTransform(servicesItemsProgress, [0, 1], [0, 1]),
                      x: useTransform(servicesItemsProgress, [0, 1], [20, 0])
                    }}
                    transition={{ duration: 0.5, delay: 0.1 }} 
                    className="border-b border-light-grey/20 pb-4"
                  > 
                    <div className="flex justify-between items-start"> 
                      <div> 
                        <h3 className="font-heading text-lg md:text-xl font-bold text-light-grey mb-1">Corporate & Commercial</h3> 
                        <p className="font-body text-light-grey/70 text-xs mb-0 pr-12 leading-relaxed"> We provide market-leading companies, investment funds and financial institutions with top-tier corporate and M&A advice in every jurisdiction. </p> 
                      </div> 
                      <Link href="/services/corporate-commercial" className="flex-shrink-0 mt-1"> 
                        <ArrowRight className="h-4 w-4 text-light-grey/50 hover:text-gold transition-colors" /> 
                      </Link> 
                    </div> 
                  </motion.div>
                  
                  <motion.div 
                    style={{ 
                      opacity: useTransform(servicesItemsProgress, [0, 1], [0, 1]),
                      x: useTransform(servicesItemsProgress, [0, 1], [20, 0])
                    }}
                    transition={{ duration: 0.5, delay: 0.2 }} 
                    className="border-b border-light-grey/20 pb-4"
                  > 
                    <div className="flex justify-between items-start"> 
                      <div> 
                        <h3 className="font-heading text-lg md:text-xl font-bold text-light-grey mb-1">Disputes</h3> 
                        <p className="font-body text-light-grey/70 text-xs mb-0 pr-12 leading-relaxed"> Our lawyers have vast experience litigating, arbitrating, investigating and resolving disputes across the world. We are ready to help, whatever the crisis. </p> 
                      </div> 
                      <Link href="/services/disputes" className="flex-shrink-0 mt-1"> 
                        <ArrowRight className="h-4 w-4 text-light-grey/50 hover:text-gold transition-colors" /> 
                      </Link> 
                    </div> 
                  </motion.div>
                  
                  <motion.div 
                    style={{ 
                      opacity: useTransform(servicesItemsProgress, [0, 1], [0, 1]),
                      x: useTransform(servicesItemsProgress, [0, 1], [20, 0])
                    }}
                    transition={{ duration: 0.5, delay: 0.3 }} 
                    className="border-b border-light-grey/20 pb-4"
                  > 
                    <div className="flex justify-between items-start"> 
                      <div> 
                        <h3 className="font-heading text-lg md:text-xl font-bold text-light-grey mb-1">Finance</h3> 
                        <p className="font-body text-light-grey/70 text-xs mb-0 pr-12 leading-relaxed"> Our finance team is renowned as one of the strongest and deepest around, with more than 1,000 attorneys located in all the major financial centers. </p> 
                      </div> 
                      <Link href="/services/finance" className="flex-shrink-0 mt-1"> 
                        <ArrowRight className="h-4 w-4 text-light-grey/50 hover:text-gold transition-colors" /> 
                      </Link> 
                    </div> 
                  </motion.div>
                  
                  <motion.div 
                    style={{ 
                      opacity: useTransform(servicesItemsProgress, [0, 1], [0, 1]),
                      x: useTransform(servicesItemsProgress, [0, 1], [20, 0])
                    }}
                    transition={{ duration: 0.5, delay: 0.4 }} 
                    className="border-b border-light-grey/20 pb-4"
                  > 
                    <div className="flex justify-between items-start"> 
                      <div> 
                        <h3 className="font-heading text-lg md:text-xl font-bold text-light-grey mb-1">Capital Markets</h3> 
                        <p className="font-body text-light-grey/70 text-xs mb-0 pr-12 leading-relaxed"> We set precedents in the capital markets advising on all debt and equity products, from investment-grade and high-yield debt offerings to IPOs. </p> 
                      </div> 
                      <Link href="/services/capital-markets" className="flex-shrink-0 mt-1"> 
                        <ArrowRight className="h-4 w-4 text-light-grey/50 hover:text-gold transition-colors" /> 
                      </Link> 
                    </div> 
                  </motion.div>
                  
                  <motion.div 
                    style={{ 
                      opacity: useTransform(servicesItemsProgress, [0, 1], [0, 1]),
                      x: useTransform(servicesItemsProgress, [0, 1], [20, 0])
                    }}
                    transition={{ duration: 0.5, delay: 0.5 }} 
                    className="border-b border-light-grey/20 pb-4"
                  > 
                    <div className="flex justify-between items-start"> 
                      <div> 
                        <h3 className="font-heading text-lg md:text-xl font-bold text-light-grey mb-1">Advisory & Regulatory</h3> 
                        <p className="font-body text-light-grey/70 text-xs mb-0 pr-12 leading-relaxed"> Our public company, corporate governance, employment, and regulatory attorneys act as trusted advisors to our clients on their most sensitive issues. </p> 
                      </div> 
                      <Link href="/services/advisory-regulatory" className="flex-shrink-0 mt-1"> 
                        <ArrowRight className="h-4 w-4 text-light-grey/50 hover:text-gold transition-colors" /> 
                      </Link> 
                    </div> 
                  </motion.div>
                  
                  <motion.div 
                    style={{ 
                      opacity: useTransform(servicesItemsProgress, [0, 1], [0, 1]),
                      x: useTransform(servicesItemsProgress, [0, 1], [20, 0])
                    }}
                    transition={{ duration: 0.5, delay: 0.6 }} 
                    className="border-b border-light-grey/20 pb-4"
                  > 
                    <div className="flex justify-between items-start"> 
                      <div> 
                        <h3 className="font-heading text-lg md:text-xl font-bold text-light-grey mb-1">Innovation</h3> 
                        <p className="font-body text-light-grey/70 text-xs mb-0 pr-12 leading-relaxed"> We are a pioneer in our industry, committed to continual advancement and finding innovative ways to exceed our clients' expectations. </p> 
                      </div> 
                      <Link href="/services/innovation" className="flex-shrink-0 mt-1"> 
                        <ArrowRight className="h-4 w-4 text-light-grey/50 hover:text-gold transition-colors" /> 
                      </Link> 
                    </div> 
                  </motion.div>
               </div>
             </div>
           </div>
         </div>
      </section>

      {/* Insights Section */}
      <section className="relative py-20 md:py-28 bg-transparent">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
             <motion.h2 className="font-heading text-3xl md:text-3xl lg:text-4xl font-bold text-light-grey mb-4 md:mb-0" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}> Spotlight on our news and insights </motion.h2>
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mr-[20%]"> <Link href="/insights" className="inline-flex items-center text-gold uppercase text-xs tracking-wider font-body group"> <span className="mr-2 group-hover:mr-3 transition-all">VIEW ALL NEWS AND INSIGHTS</span> <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" /> </Link> </motion.div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5">
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
                 <span className="text-xs text-light-grey/70 mb-1 block font-body">Energy</span>
                 <h3 className="font-heading text-2xl md:text-3xl font-bold text-light-grey mb-3"> Amara & Partners strengthens U.S. energy and energy transition offering with two strategic partner hires </h3>
                 <div className="flex items-center mt-4">
                   <div className="h-5 w-1 bg-gold mr-3"></div>
                   <span className="uppercase text-xs font-medium font-body">FIRM NEWS</span>
                   <span className="text-light-grey/50 ml-auto text-xs font-body">7 Apr 2025</span>
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
                     <span className="text-xs text-light-grey/70 mb-1 block font-body">Artificial Intelligence</span>
                     <h3 className="font-heading text-base font-bold text-light-grey mb-2"> Amara & Partners to roll out agentic AI agents targeting complex legal workflows </h3>
                     <div className="flex items-center mt-3">
                       <div className="h-4 w-1 bg-gold mr-2"></div>
                       <span className="uppercase text-[10px] font-medium font-body">FIRM NEWS</span>
                       <span className="text-light-grey/50 ml-auto text-[10px] font-body">6 Apr 2025</span>
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
                     <span className="text-xs text-light-grey/70 mb-1 block font-body">Regulatory</span>
                     <h3 className="font-heading text-base font-bold text-light-grey mb-2"> Global trends in merger control enforcement </h3>
                     <div className="flex items-center mt-3">
                       <div className="h-4 w-1 bg-green-700 mr-2"></div>
                       <span className="uppercase text-[10px] font-medium font-body">REPORT</span>
                       <span className="text-light-grey/50 ml-auto text-[10px] font-body">27 Feb 2025</span>
                     </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
       <section className="py-20 md:py-28 bg-gold text-charcoal">
         <div className="container mx-auto px-8">
           <div className="grid grid-cols-12 gap-8">
             <div className="col-span-12 md:col-span-4">
               <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10">
                 <h2 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold mb-5"> Let's start a <br /> conversation </h2>
                 <p className="font-body text-charcoal/80 text-xs mb-8 max-w-md leading-relaxed"> Whether you have a complex legal challenge or are looking for strategic advice, our team is ready to help. </p>
                 <div className="flex flex-wrap gap-6">
                   <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}> <Link href="/contact"> <Button className="bg-charcoal text-gold hover:bg-gold-dark px-6 py-5 rounded-none font-body"> Contact Us <ArrowRight className="h-4 w-4 ml-2" /> </Button> </Link> </motion.div>
                   <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}> <Link href="/locations"> <Button variant="outline" className="border-charcoal text-charcoal hover:bg-charcoal/5 px-6 py-5 rounded-none font-body"> Our Locations </Button> </Link> </motion.div>
                 </div>
               </motion.div>
             </div>
             <div className="col-span-12 md:col-span-4 relative">
               <div className="grid grid-cols-2 gap-4">
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-gold p-5"> <MapPin className="h-5 w-5 text-charcoal/80 mb-3" /> <h3 className="font-heading text-base font-bold mb-2">Abu Dhabi</h3> <p className="font-body text-charcoal/70 text-xs"> Al Sila Tower, ADGM Square <br /> Al Maryah Island </p> </motion.div>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-gold p-5"> <Phone className="h-5 w-5 text-charcoal/80 mb-3" /> <h3 className="font-heading text-base font-bold mb-2">Call Us</h3> <p className="font-body text-charcoal/70 text-xs"> +971 2 123 4567 <br /> Mon-Fri, 8:30AM-5:30PM </p> </motion.div>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-gold p-5 col-span-2"> <Mail className="h-5 w-5 text-charcoal/80 mb-3" /> <h3 className="font-heading text-base font-bold mb-2">Email Us</h3> <p className="font-body text-charcoal/70 text-xs"> info@amarapartners.com <br /> For general inquiries </p> </motion.div>
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