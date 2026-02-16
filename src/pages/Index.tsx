import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import StoryCarousel from "@/components/StoryCarousel";
import StoryCard from "@/components/StoryCard";
import Navbar from "@/components/Navbar";
import YuriChatbot from "@/components/YuriChatbot";

const Index = () => {
  const [allStories, setAllStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH LIVE DATA FROM FIREBASE
  useEffect(() => {
    const q = query(collection(db, "stories"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const storiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAllStories(storiesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const featuredStories = allStories.filter(s => s.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      
      {loading ? (
        <div className="flex justify-center py-20 font-mono">Loading Dispatches...</div>
      ) : (
        <>
          <StoryCarousel stories={featuredStories} />

          {/* All Stories Grid */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="mb-8">
                <p className="text-xs font-mono text-primary tracking-[0.2em] uppercase mb-1">Archive</p>
                <h2 className="text-3xl md:text-4xl font-bold">All Stories</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allStories.map((story, i) => (
                  <StoryCard key={story.id} story={story} index={i} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="border-t border-border/30 py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="gradient-text text-2xl font-bold mb-2">ZENITH</p>
          <p className="text-muted-foreground text-sm font-mono">
            Dispatches from the Cosmos • Built with ❤️ for the stars
          </p>
        </div>
      </footer>

      <YuriChatbot />
    </div>
  );
};

export default Index;