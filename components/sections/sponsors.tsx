"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useAudio } from "@/components/providers/audio-provider";
import { useCursor } from "@/components/providers/cursor-provider";
import { Button } from "@/components/ui/button";

const sponsors = [
  {
    name: "TechCorp",
    tier: "platinum",
    logo: "/images/sponsors/techcorp.svg"
  },
  {
    name: "InnoSoft",
    tier: "gold",
    logo: "/images/sponsors/innosoft.svg"
  },
  {
    name: "FutureTech",
    tier: "gold",
    logo: "/images/sponsors/futuretech.svg"
  },
  {
    name: "Creative Studios",
    tier: "silver",
    logo: "/images/sponsors/creative.svg"
  },
  {
    name: "Digital Media",
    tier: "silver",
    logo: "/images/sponsors/digital.svg"
  },
  {
    name: "Data Systems",
    tier: "silver",
    logo: "/images/sponsors/data.svg"
  }
];

export default function SponsorsSection() {
  const { playSound } = useAudio();
  const { setCursor } = useCursor();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };
  
  return (
    <section 
      id="sponsors" 
      className="py-20 relative"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl opacity-50" />
        <div className="absolute top-1/4 -left-10 w-60 h-60 bg-secondary/5 rounded-full filter blur-3xl opacity-30" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-accent to-neon-4">
            Our Sponsors
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Infotsav wouldn't be possible without the generous support of our sponsors. These industry leaders help us bring the festival to life.
          </p>
        </motion.div>
        
        {/* Placeholder for sponsors - In a real implementation, these would be actual logos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <h3 className="text-lg font-semibold mb-8 text-center text-foreground/70">Platinum Sponsors</h3>
          <div className="flex justify-center gap-8 flex-wrap">
            <motion.div
              variants={itemVariants}
              className="glass-panel rounded-lg p-10 w-full max-w-md flex items-center justify-center hover-scale"
              onMouseEnter={() => {
                setCursor("expand");
                playSound("hover");
              }}
              onMouseLeave={() => setCursor("default")}
            >
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                TechCorp
              </div>
            </motion.div>
          </div>
          
          <h3 className="text-lg font-semibold my-8 text-center text-foreground/70">Gold Sponsors</h3>
          <div className="flex justify-center gap-8 flex-wrap">
            <motion.div
              variants={itemVariants}
              className="glass-panel rounded-lg p-8 w-full max-w-xs flex items-center justify-center hover-scale"
              onMouseEnter={() => {
                setCursor("expand");
                playSound("hover");
              }}
              onMouseLeave={() => setCursor("default")}
            >
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">
                InnoSoft
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="glass-panel rounded-lg p-8 w-full max-w-xs flex items-center justify-center hover-scale"
              onMouseEnter={() => {
                setCursor("expand");
                playSound("hover");
              }}
              onMouseLeave={() => setCursor("default")}
            >
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">
                FutureTech
              </div>
            </motion.div>
          </div>
          
          <h3 className="text-lg font-semibold my-8 text-center text-foreground/70">Silver Sponsors</h3>
          <div className="flex justify-center gap-6 flex-wrap">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass-panel rounded-lg p-6 w-full max-w-[200px] flex items-center justify-center hover-scale"
                onMouseEnter={() => {
                  setCursor("expand");
                  playSound("hover");
                }}
                onMouseLeave={() => setCursor("default")}
              >
                <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-neon-4">
                  Sponsor {i}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-panel rounded-lg p-8 max-w-2xl mx-auto text-center"
        >
          <h3 className="text-xl font-semibold mb-4">Become a Sponsor</h3>
          <p className="text-foreground/70 mb-6">
            Join our prestigious list of sponsors and connect your brand with tech-savvy, creative individuals. Sponsorship packages offer excellent brand visibility and networking opportunities.
          </p>
          <Button
            className="bg-gradient-to-r from-accent to-neon-4 text-white font-medium"
            onMouseEnter={() => {
              setCursor("pointer");
              playSound("hover");
            }}
            onMouseLeave={() => setCursor("default")}
            onClick={() => playSound("click")}
          >
            Get Sponsorship Details
          </Button>
        </motion.div>
      </div>
    </section>
  );
}