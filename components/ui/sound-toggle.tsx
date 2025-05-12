"use client";

import { Button } from "@/components/ui/button";
import { useAudio } from "@/components/providers/audio-provider";
import { useCursor } from "@/components/providers/cursor-provider";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface SoundToggleProps {
  className?: string;
}

export default function SoundToggle({ className = "" }: SoundToggleProps) {
  const { isMuted, toggleMute, playSound } = useAudio();
  const { setCursor } = useCursor();

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.3 }}
    >
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-background/50 backdrop-blur-md border-white/10 hover:bg-background/70"
        onClick={() => {
          toggleMute();
          playSound("click");
        }}
        onMouseEnter={() => {
          setCursor("pointer");
          playSound("hover");
        }}
        onMouseLeave={() => setCursor("default")}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Volume2 className="h-4 w-4 text-primary" />
        )}
      </Button>
    </motion.div>
  );
}