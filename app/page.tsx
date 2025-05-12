import { Suspense } from "react";
import dynamic from "next/dynamic";
import { NavBar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import Loading from "@/components/ui/loading";
import SoundToggle from "@/components/ui/sound-toggle";
import Newsletter from "@/components/sections/newsletter";
import AboutSection from "@/components/sections/about";
import EventsSection from "@/components/sections/events";
import SponsorsSection from "@/components/sections/sponsors";
import ContactSection from "@/components/sections/contact";

// Dynamically import 3D components with no SSR
const Hero = dynamic(() => import("@/components/sections/hero"), {
    ssr: false,
    loading: () => <Loading />,
});

export default function Home() {
    return (
        <main className="min-h-screen relative overflow-hidden">
            <SoundToggle className="fixed top-4 right-4 z-50" />
            <NavBar />

            <Suspense fallback={<Loading />}>
                <Hero />
            </Suspense>

            <AboutSection />
            <EventsSection />
            <SponsorsSection />
            <Newsletter />
            <ContactSection />
            <Footer />
        </main>
    );
}
