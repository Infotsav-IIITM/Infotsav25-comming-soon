"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

interface CountdownTimerProps {
    targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date();
            let newTimeLeft: TimeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };

            if (difference > 0) {
                newTimeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }

            setTimeLeft(newTimeLeft);
        };

        // Initial calculation
        calculateTimeLeft();

        // Update time every second
        const timer = setInterval(() => {
            calculateTimeLeft();
        }, 1000);

        // Clean up
        return () => clearInterval(timer);
    }, [targetDate]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
    };

    // Format time values to always have two digits
    const formatTimeValue = (value: number): string => {
        return value.toString().padStart(2, "0");
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap justify-center gap-4">
            {/* Days */}
            <motion.div
                variants={itemVariants}
                className="glass-panel rounded-lg p-4 w-20 md:w-24 text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                    {formatTimeValue(timeLeft.days)}
                </div>
                <div className="text-xs uppercase tracking-wider text-foreground/70">
                    Days
                </div>
            </motion.div>

            {/* Hours */}
            <motion.div
                variants={itemVariants}
                className="glass-panel rounded-lg p-4 w-20 md:w-24 text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary">
                    {formatTimeValue(timeLeft.hours)}
                </div>
                <div className="text-xs uppercase tracking-wider text-foreground/70">
                    Hours
                </div>
            </motion.div>

            {/* Minutes */}
            <motion.div
                variants={itemVariants}
                className="glass-panel rounded-lg p-4 w-20 md:w-24 text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">
                    {formatTimeValue(timeLeft.minutes)}
                </div>
                <div className="text-xs uppercase tracking-wider text-foreground/70">
                    Minutes
                </div>
            </motion.div>

            {/* Seconds */}
            <motion.div
                variants={itemVariants}
                className="glass-panel rounded-lg p-4 w-20 md:w-24 text-center">
                <div className="text-3xl md:text-4xl font-bold text-neon-4">
                    {formatTimeValue(timeLeft.seconds)}
                </div>
                <div className="text-xs uppercase tracking-wider text-foreground/70">
                    Seconds
                </div>
            </motion.div>
        </motion.div>
    );
}
