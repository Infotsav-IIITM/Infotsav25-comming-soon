"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorContextType = {
  activeCursor: string;
  setCursor: (cursor: string) => void;
};

const CursorContext = createContext<CursorContextType>({
  activeCursor: "default",
  setCursor: () => {},
});

export const useCursor = () => useContext(CursorContext);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [activeCursor, setActiveCursor] = useState("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Create smooth springs for cursor movement
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Handle cursor movement
  useEffect(() => {
    if (isMobile) return;
    
    const updateCursorPosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    document.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    
    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isMobile]);

  // Handle custom cursor classes
  const getCursorSize = () => {
    switch (activeCursor) {
      case "pointer":
        return "w-6 h-6 bg-primary/60";
      case "expand":
        return "w-12 h-12 bg-secondary/40";
      case "text":
        return "w-4 h-16 bg-white/80";
      default:
        return "w-4 h-4 bg-white/80";
    }
  };

  // Update document cursor style
  useEffect(() => {
    if (isMobile) return;
    document.body.classList.add("no-cursor");
    return () => document.body.classList.remove("no-cursor");
  }, [isMobile]);

  return (
    <CursorContext.Provider
      value={{
        activeCursor,
        setCursor: setActiveCursor,
      }}
    >
      {!isMobile && (
        <motion.div
          className={`custom-cursor ${getCursorSize()} ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        />
      )}
      {children}
    </CursorContext.Provider>
  );
};