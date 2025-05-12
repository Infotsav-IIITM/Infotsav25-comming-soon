"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/providers/audio-provider";
import { useCursor } from "@/components/providers/cursor-provider";
import { Button } from "@/components/ui/button";
import { Cpu, Sparkles, Calendar, Users, Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about", icon: <Sparkles className="w-4 h-4" /> },
  { name: "Events", href: "#events", icon: <Calendar className="w-4 h-4" /> },
  { name: "Sponsors", href: "#sponsors", icon: <Users className="w-4 h-4" /> },
  { name: "Contact", href: "#contact", icon: <Cpu className="w-4 h-4" /> },
];

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { playSound } = useAudio();
  const { setCursor } = useCursor();
  
  // Handle scroll change for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    playSound("click");
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Nav animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  
  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onMouseEnter={() => {
                setCursor("pointer");
                playSound("hover");
              }}
              onMouseLeave={() => setCursor("default")}
            >
              <Cpu className="w-8 h-8 text-primary" />
              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-text-shimmer">
                INFOTSAV
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:flex space-x-2"
            >
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={itemVariants}>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hover:bg-primary/10"
                    onMouseEnter={() => {
                      setCursor("pointer");
                      playSound("hover");
                    }}
                    onMouseLeave={() => setCursor("default")}
                  >
                    <Link href={link.href} className="flex items-center gap-1">
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  </Button>
                </motion.div>
              ))}
              <motion.div variants={itemVariants}>
                <Button
                  size="sm"
                  className="ml-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                  onMouseEnter={() => {
                    setCursor("pointer");
                    playSound("hover");
                  }}
                  onMouseLeave={() => setCursor("default")}
                >
                  Register Now
                </Button>
              </motion.div>
            </motion.nav>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </motion.header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-md md:hidden pt-24 px-6"
          >
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col space-y-4"
            >
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={itemVariants}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                    asChild
                  >
                    <Link href={link.href} className="flex items-center gap-2">
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  </Button>
                </motion.div>
              ))}
              <motion.div variants={itemVariants}>
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-primary to-secondary"
                  onClick={() => {
                    playSound("click");
                    setMobileMenuOpen(false);
                  }}
                >
                  Register Now
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}