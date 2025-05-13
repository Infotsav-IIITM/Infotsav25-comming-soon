"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useAudio } from "@/components/providers/audio-provider";
import { useCursor } from "@/components/providers/cursor-provider";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

const events = [
    {
        id: "hackathon",
        title: "Hackatron",
        description:
            "48-hour coding marathon to build innovative solutions to real-world problems.",
        image: "https://images.pexels.com/photos/7102/notes-macbook-study-conference.jpg",
        category: "competition",
    },
    {
        id: "ai-workshop",
        title: "AI & Future Tech Workshop",
        description:
            "Learn about cutting-edge AI technologies and their applications in various fields.",
        image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
        category: "workshop",
    },
    {
        id: "cultural-night",
        title: "Fusion Cultural Night",
        description:
            "A spectacular showcase of music, dance, and artistic performances by talented students.",
        image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
        category: "cultural",
    },
    {
        id: "robotics",
        title: "Robotics Challenge",
        description:
            "Design and program robots to navigate complex courses and complete challenging tasks.",
        image: "https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg",
        category: "competition",
    },
];

export default function EventsSection() {
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
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    // Get category badge class
    const getCategoryBadge = (category: string) => {
        switch (category) {
            case "competition":
                return "bg-primary/20 text-primary";
            case "workshop":
                return "bg-secondary/20 text-secondary";
            case "cultural":
                return "bg-accent/20 text-accent";
            default:
                return "bg-primary/20 text-primary";
        }
    };

    return (
        <section id="events" className="py-20 relative" ref={ref}>
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-background via-background/90 to-background opacity-90" />
                <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl opacity-30" />
                <div className="absolute top-1/3 right-1/3 w-60 h-60 bg-primary/10 rounded-full filter blur-3xl opacity-20" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">
                        Featured Events
                    </h2>
                    <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                        Discover the exciting events that await you at Infotsav
                        2025. From intense coding competitions to creative
                        cultural showcases, there's something for everyone.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            variants={itemVariants}
                            className="glass-panel rounded-lg overflow-hidden group"
                            onMouseEnter={() => {
                                setCursor("expand");
                                playSound("hover");
                            }}
                            onMouseLeave={() => setCursor("default")}>
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70" />
                                <div className="absolute bottom-4 left-4">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadge(
                                            event.category
                                        )}`}>
                                        {event.category
                                            .charAt(0)
                                            .toUpperCase() +
                                            event.category.slice(1)}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                                    {event.title}
                                </h3>
                                <p className="text-foreground/70 mb-4">
                                    {event.description}
                                </p>

                                <Button
                                    variant="ghost"
                                    className="group"
                                    onClick={() => playSound("click")}>
                                    View Details
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center">
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-secondary to-accent text-white font-medium"
                        onMouseEnter={() => {
                            setCursor("pointer");
                            playSound("hover");
                        }}
                        onMouseLeave={() => setCursor("default")}
                        onClick={() => playSound("click")}>
                        View All Events
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
