"use client";

import { useAudio } from "@/components/providers/audio-provider";
import { useCursor } from "@/components/providers/cursor-provider";
import { Cpu } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const { playSound } = useAudio();
  const { setCursor } = useCursor();
  
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "About",
      links: [
        { label: "About Infotsav", href: "#about" },
        { label: "Our Team", href: "#" },
        { label: "Past Events", href: "#" },
        { label: "Gallery", href: "#" },
      ],
    },
    {
      title: "Events",
      links: [
        { label: "Technical Events", href: "#" },
        { label: "Cultural Events", href: "#" },
        { label: "Workshops", href: "#" },
        { label: "Schedule", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "FAQs", href: "#" },
        { label: "Campus Map", href: "#" },
        { label: "Accommodation", href: "#" },
        { label: "Travel Info", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Code of Conduct", href: "#" },
      ],
    },
  ];
  
  return (
    <footer className="relative pt-16 pb-6 z-10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-wrap justify-between mb-12">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <Link
              href="/"
              className="flex items-center space-x-2 mb-4"
              onMouseEnter={() => {
                setCursor("pointer");
                playSound("hover");
              }}
              onMouseLeave={() => setCursor("default")}
            >
              <Cpu className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">INFOTSAV</span>
            </Link>
            <p className="text-foreground/70 mb-4 max-w-md">
              Infotsav is the annual techno-cultural festival of XYZ University. It brings together technology enthusiasts, creative minds, and cultural performers for a three-day celebration of innovation and expression.
            </p>
            <p className="text-foreground/60 text-sm">
              Contact us at: info@infotsav.org
            </p>
          </div>
          
          <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-foreground/70 hover:text-primary transition-colors"
                        onMouseEnter={() => {
                          setCursor("pointer");
                          playSound("hover");
                        }}
                        onMouseLeave={() => setCursor("default")}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-foreground/60 text-sm">
          <p>© {currentYear} Infotsav. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}