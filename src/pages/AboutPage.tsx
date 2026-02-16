import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-primary tracking-[0.2em] uppercase mb-2">
              Mission Statement
            </p>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              About ZENITH
            </h1>
          </div>

          {/* Founder Section */}
          <div className="glass-card rounded-2xl p-8 md:p-12 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Photo placeholder - replace with your actual photo */}
              <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/40 border-2 border-primary/30 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                <div className="text-center">
                  <div className="text-6xl mb-2">🚀</div>
                  <p className="text-xs font-mono text-primary">Your Photo Here</p>
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">The Founder's Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    ZENITH was born from a simple belief: space exploration isn't just about rockets 
                    and equations—it's about the human stories behind every mission, the cosmic mysteries 
                    that keep us awake at night, and the profound questions that connect us all.
                  </p>
                  <p>
                    I've always been fascinated by the cosmos. As a child, I'd spend hours staring at 
                    the stars, wondering what was out there. That wonder never faded. As I grew older, 
                    I realized that the most powerful space stories weren't always in academic journals 
                    or news headlines—they were in the personal experiences of astronauts, the breakthrough 
                    moments of scientists, and the philosophical questions that arise when we contemplate 
                    our place in the universe.
                  </p>
                  <p>
                    ZENITH is my way of bringing those stories to light. It's a space where scientific 
                    accuracy meets human emotion, where we can explore the technical marvels of space 
                    exploration while never losing sight of the wonder that drives it all.
                  </p>
                  <p>
                    This platform is my love letter to the cosmos—and an invitation for you to join me 
                    in looking up, asking questions, and never losing that childlike sense of awe when 
                    we gaze at the stars.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl p-6 border border-primary/20"
            >
              <div className="text-3xl mb-3">🌌</div>
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                To make space exploration accessible, inspiring, and deeply human. We believe that 
                everyone deserves to feel connected to the cosmos, regardless of their scientific background.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl p-6 border border-primary/20"
            >
              <div className="text-3xl mb-3">✨</div>
              <h3 className="text-xl font-bold mb-2">Our Vision</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A world where space exploration unites humanity, where we look to the stars not as 
                distant objects, but as our shared future—a future built on curiosity, wonder, and collaboration.
              </p>
            </motion.div>
          </div>

          {/* What We Cover */}
          <div className="glass-card rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">What We Cover</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🛸</div>
                <h4 className="font-semibold mb-2">Space Missions</h4>
                <p className="text-sm text-muted-foreground">
                  Deep dives into current and future missions, from the ISS to Mars and beyond.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🔭</div>
                <h4 className="font-semibold mb-2">Cosmic Discoveries</h4>
                <p className="text-sm text-muted-foreground">
                  Breaking down the latest findings from telescopes, rovers, and research papers.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">👨‍🚀</div>
                <h4 className="font-semibold mb-2">Human Stories</h4>
                <p className="text-sm text-muted-foreground">
                  The personal experiences and philosophical insights of those who explore space.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-4">
              Have a story to share or questions about the cosmos?
            </p>
            <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all glow-border">
              Get in Touch
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
