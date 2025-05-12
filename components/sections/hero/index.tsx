"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/components/providers/audio-provider";
import { useCursor } from "@/components/providers/cursor-provider";
import InfotsavScene from "./scene";
import CountdownTimer from "./countdown-timer";
import dynamic from "next/dynamic";

const eventDate = new Date("2025-03-15T10:00:00");

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const { playSound } = useAudio();
  const { setCursor } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Set loaded after a slight delay to ensure smooth animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D Canvas background */}
      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <InfotsavScene />
        </Suspense>
      </Canvas>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-screen-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 glow-text bg-clip-text text-transparent bg-gradient-to-br from-white via-primary to-white">
              <span className="block">INFOTSAV</span>
              <span className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-widest block mt-2">
                2025
              </span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto"
          >
            Where Technology Meets Culture
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <CountdownTimer targetDate={eventDate} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary text-white font-medium text-lg neon-border"
              onMouseEnter={() => {
                setCursor("pointer");
                playSound("hover");
              }}
              onMouseLeave={() => setCursor("default")}
              onClick={() => playSound("click")}
            >
              Register Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 backdrop-blur-sm hover:bg-white/10 text-lg"
              onMouseEnter={() => {
                setCursor("pointer");
                playSound("hover");
              }}
              onMouseLeave={() => setCursor("default")}
              onClick={() => playSound("click")}
            >
              Explore Events
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center"
        >
          <p className="text-sm text-foreground/60 mb-2">Scroll Down</p>
          <div className="w-0.5 h-10 bg-gradient-to-b from-foreground/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}