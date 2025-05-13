"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useAudio } from "@/components/providers/audio-provider";
import { useCursor } from "@/components/providers/cursor-provider";
import { Button } from "@/components/ui/button";
import {
    Mail,
    Phone,
    MapPin,
    Instagram,
    Facebook,
    Twitter,
    Linkedin,
} from "lucide-react";

export default function ContactSection() {
    const { playSound } = useAudio();
    const { setCursor } = useCursor();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    const socialLinks = [
        {
            icon: <Instagram className="w-5 h-5" />,
            label: "Instagram",
            href: "#",
        },
        {
            icon: <Facebook className="w-5 h-5" />,
            label: "Facebook",
            href: "#",
        },
        { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "#" },
        {
            icon: <Linkedin className="w-5 h-5" />,
            label: "LinkedIn",
            href: "#",
        },
    ];

    const contactInfo = [
        {
            icon: <Mail className="w-5 h-5 text-primary" />,
            label: "Email Us",
            value: "infotsav@iiitm.ac.in",
        },
        {
            icon: <Phone className="w-5 h-5 text-secondary" />,
            label: "Call Us - 1",
            value: "Vinal Sir (Faculty Coordinator) +91 1234567890",
        },
        {
            icon: <Phone className="w-5 h-5 text-secondary" />,
            label: "Call Us - 1",
            value: "Samyak Chaudhary (Infotsav Coordinator) +91 1234567890",
        },
        {
            icon: <Phone className="w-5 h-5 text-secondary" />,
            label: "Call Us - 1",
            value: "Shashank (Infotsav Coordinator) +91 1234567890",
        },
        {
            icon: <Phone className="w-5 h-5 text-secondary" />,
            label: "Call Us - 1",
            value: "Krish (Infotsav Coordinator) +91 1234567890",
        },
        {
            icon: <Phone className="w-5 h-5 text-secondary" />,
            label: "Call Us - 1",
            value: "Rohit Kumawat - Rokum (Infotsav Coordinator) +91 9130660628",
        },
        {
            icon: <MapPin className="w-5 h-5 text-accent" />,
            label: "Visit Us",
            value: "ABV-IIITM Gwalior Campus, Morena Link Road, Gwalior, Madhya Pradesh",
        },
    ];

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
        <section id="contact" className="py-20 relative" ref={ref}>
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-b from-background/90 to-background" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl opacity-40" />
                <div className="absolute top-1/3 right-0 w-40 h-40 bg-primary/5 rounded-full filter blur-2xl opacity-30" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-neon-4 to-primary">
                        Get In Touch
                    </h2>
                    <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                        Have questions about Infotsav 2025? Our team is here to
                        help. Reach out to us through any of the channels below.
                    </p>
                </motion.div>

                <div className=" mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-panel rounded-lg p-8">
                        <h3 className="text-xl font-semibold mb-6">
                            Contact Information
                        </h3>

                        <div className="space-y-6 mb-8">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="mt-1 mr-4">{info.icon}</div>
                                    <div>
                                        <h4 className="text-sm font-medium text-foreground/70">
                                            {info.label}
                                        </h4>
                                        <p className="text-foreground">
                                            {info.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h4 className="text-sm font-medium text-foreground/70 mb-4">
                            Follow Us
                        </h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full border-white/10 hover:bg-white/10 hover:text-primary"
                                    onMouseEnter={() => {
                                        setCursor("pointer");
                                        playSound("hover");
                                    }}
                                    onMouseLeave={() => setCursor("default")}
                                    onClick={() => playSound("click")}>
                                    {social.icon}
                                </Button>
                            ))}
                        </div>
                    </motion.div>
                    {/*           
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-panel rounded-lg p-8"
          >
            <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Your Name</label>
                <input
                  type="text"
                  className="w-full h-10 px-3 rounded-md bg-white/5 backdrop-blur-sm border border-white/10 focus:border-primary transition-all outline-none"
                  onMouseEnter={() => {
                    setCursor("text");
                    playSound("hover");
                  }}
                  onMouseLeave={() => setCursor("default")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Your Email</label>
                <input
                  type="email"
                  className="w-full h-10 px-3 rounded-md bg-white/5 backdrop-blur-sm border border-white/10 focus:border-primary transition-all outline-none"
                  onMouseEnter={() => {
                    setCursor("text");
                    playSound("hover");
                  }}
                  onMouseLeave={() => setCursor("default")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full h-10 px-3 rounded-md bg-white/5 backdrop-blur-sm border border-white/10 focus:border-primary transition-all outline-none"
                  onMouseEnter={() => {
                    setCursor("text");
                    playSound("hover");
                  }}
                  onMouseLeave={() => setCursor("default")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full p-3 rounded-md bg-white/5 backdrop-blur-sm border border-white/10 focus:border-primary transition-all outline-none"
                  onMouseEnter={() => {
                    setCursor("text");
                    playSound("hover");
                  }}
                  onMouseLeave={() => setCursor("default")}
                ></textarea>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-neon-4 to-primary text-white font-medium"
                onMouseEnter={() => {
                  setCursor("pointer");
                  playSound("hover");
                }}
                onMouseLeave={() => setCursor("default")}
                onClick={() => playSound("click")}
              >
                Send Message
              </Button>
            </div>
          </motion.div> */}
                </div>
            </div>
        </section>
    );
}
