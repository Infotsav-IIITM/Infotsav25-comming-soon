"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useAudio } from "@/components/providers/audio-provider";
import { useCursor } from "@/components/providers/cursor-provider";
import { Button } from "@/components/ui/button";
import { 
  Cpu, 
  Code, 
  Palette, 
  Music, 
  Users,
  Award,
  BookOpen,
  Zap
} from "lucide-react";

const features = [
  {
    icon: <Code className="w-6 h-6 text-primary" />,
    title: "Tech Competitions",
    description: "Compete in coding, hackathons, and algorithm challenges with participants from across the country."
  },
  {
    icon: <Palette className="w-6 h-6 text-secondary" />,
    title: "Cultural Events",
    description: "Experience a fusion of technology and culture through art installations, performances, and exhibitions."
  },
  {
    icon: <BookOpen className="w-6 h-6 text-accent" />,
    title: "Workshops",
    description: "Learn from industry experts in hands-on sessions covering cutting-edge technologies and creative processes."
  },
  {
    icon: <Users className="w-6 h-6 text-neon-4" />,
    title: "Networking",
    description: "Connect with like-minded individuals, potential collaborators, mentors, and industry professionals."
  },
  {
    icon: <Award className="w-6 h-6 text-primary" />,
    title: "Awards",
    description: "Win prestigious accolades and prizes worth over $10,000 across various competition categories."
  },
  {
    icon: <Zap className="w-6 h-6 text-secondary" />,
    title: "Tech Talks",
    description: "Gain insights from thought leaders and visionaries shaping the future of technology and culture."
  }
];

export default function AboutSection() {
  const { playSound } = useAudio();
  const { setCursor } = useCursor();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
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
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  
  return (
    <section 
      id="about" 
      className="py-20 relative bg-gradient-to-b from-background via-background/95 to-background"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute top-1/4 -right-10 w-60 h-60 bg-secondary/10 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 -left-20 w-60 h-60 bg-accent/10 rounded-full filter blur-3xl opacity-20" />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            About Infotsav
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Infotsav is the annual techno-cultural festival that bridges the gap between technology and artistic expression. Join us for three days of innovation, creativity, and celebration.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-panel rounded-lg p-6 hover-scale"
              onMouseEnter={() => {
                setCursor("expand");
                playSound("hover");
              }}
              onMouseLeave={() => setCursor("default")}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary text-white font-medium"
            onMouseEnter={() => {
              setCursor("pointer");
              playSound("hover");
            }}
            onMouseLeave={() => setCursor("default")}
            onClick={() => playSound("click")}
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}