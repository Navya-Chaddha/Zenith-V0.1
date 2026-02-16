import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-space.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Deep space nebula" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 starfield" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-primary/80 text-sm tracking-[0.3em] uppercase mb-4">
            Dispatches from the Cosmos
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter glow-text">
            <span className="gradient-text">ZENITH</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Your portal to the universe — space news, deep dives, and cosmic stories.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex gap-4"
        >
          <Link
            to="#stories"
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all glow-border"
          >
            Read Stories
          </Link>
          <Link
            to="/admin"
            className="px-8 py-3 rounded-lg border border-border text-foreground hover:border-primary/50 hover:bg-secondary/50 transition-all"
          >
            Write a Story
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
