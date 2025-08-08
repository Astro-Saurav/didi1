import { motion } from "framer-motion";
import EXOBackground from "@/components/EXOBackground";
import NeonRibbon from "@/components/NeonRibbon";
import Gallery from "@/components/Gallery";
import VideoSection from "@/components/VideoSection";

const Index = () => {
  return (
    <main>
      <EXOBackground />
      <section className="relative min-h-[86vh] flex items-center justify-center overflow-hidden">
        <NeonRibbon />
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Priya Didi ❤️
          </motion.h1>
          <motion.p
            className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Priya, you’re my heartbeat and my hero—always my strength, and remember, just like you’ve never let me stand alone, I’ll never let you face this world alone.
          </motion.p>
          <motion.div
            className="mt-8 inline-flex rounded-full px-6 py-3 bg-hero text-foreground neon-border hover-scale"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            Scroll to explore
          </motion.div>
        </div>
      </section>

      <Gallery />
      <VideoSection />

      <section className="container mx-auto py-16 sm:py-24">
        <div className="glow-card rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold">Always My Hero</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Thank you for the love, guidance, and endless cheer. May our bond keep shining—purple, pink, and neon bright.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Index;
