"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useAudio } from "@/components/providers/audio-provider";
import { useCursor } from "@/components/providers/cursor-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function Newsletter() {
  const { playSound } = useAudio();
  const { setCursor } = useCursor();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [isSubscribing, setIsSubscribing] = useState(false);
  
  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  
  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubscribing(true);
    playSound("click");
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      form.reset();
      playSound("success");
      toast.success("Subscribed successfully!", {
        description: "You're now on the list for Infotsav updates.",
      });
    }, 1500);
  }
  
  return (
    <section 
      id="newsletter" 
      className="py-20 relative"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/80 via-background to-background/90" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-secondary/10 rounded-full filter blur-3xl opacity-20" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-3xl mx-auto glass-panel rounded-lg p-8 md:p-12 neon-border">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 glow-text">
              Stay Updated
            </h2>
            <p className="text-foreground/80">
              Subscribe to our newsletter for the latest updates on Infotsav 2025 events, speakers, and exclusive content.
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          className="h-12 pl-4 pr-36 bg-white/5 backdrop-blur-sm border-white/10 focus:border-primary transition-all"
                          onMouseEnter={() => {
                            setCursor("text");
                            playSound("hover");
                          }}
                          onMouseLeave={() => setCursor("default")}
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="submit"
                        className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
                        disabled={isSubscribing}
                        onMouseEnter={() => {
                          setCursor("pointer");
                          playSound("hover");
                        }}
                        onMouseLeave={() => setCursor("default")}
                      >
                        {isSubscribing ? "Subscribing..." : "Subscribe"}
                      </Button>
                    </div>
                    <FormMessage className="text-destructive text-sm mt-1" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          
          <p className="text-xs text-foreground/60 text-center mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </motion.div>
    </section>
  );
}