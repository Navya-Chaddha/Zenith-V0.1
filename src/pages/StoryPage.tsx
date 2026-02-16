import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Volume2, VolumeX } from "lucide-react";
import { stories } from "@/data/stories";
import TextSelectionPopup from "@/components/TextSelectionPopup";
import Navbar from "@/components/Navbar";
import YuriChatbot from "@/components/YuriChatbot";

const StoryPage = () => {
  const { id } = useParams();
  const story = stories.find(s => s.id === id);
  const [likes, setLikes] = useState(story?.likes || 0);
  const [liked, setLiked] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const contentRef = useRef<HTMLDivElement>(null);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Story not found.</p>
      </div>
    );
  }

  const handleLike = () => {
    if (!liked) {
      setLikes(prev => prev + 1);
      setLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setLiked(false);
    }
  };

  const handleReadAloud = () => {
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(story.content);
    utterance.lang = lang === "hi" ? "hi-IN" : "en-US";
    utterance.rate = 0.9;
    utterance.onend = () => setIsReading(false);
    speechSynthesis.speak(utterance);
    setIsReading(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero image */}
      <div className="relative h-[50vh] overflow-hidden">
        <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </div>

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative -mt-32 z-10 max-w-3xl mx-auto px-6"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to stories
        </Link>

        <div className="glass-card rounded-2xl p-8 md:p-12">
          <span className="text-xs font-mono text-primary tracking-[0.2em] uppercase">
            {story.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 leading-tight">{story.title}</h1>
          <p className="text-muted-foreground mt-2 font-mono text-sm">
            {story.date} • {story.readTime} read
          </p>

          {/* Audio controls */}
          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <button
              onClick={handleReadAloud}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-all ${
                isReading
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {isReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              {isReading ? "Stop Reading" : "Read Aloud"}
            </button>
            <div className="flex gap-1 text-xs font-mono">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-md border transition-all ${
                  lang === "en" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("hi")}
                className={`px-3 py-1.5 rounded-md border transition-all ${
                  lang === "hi" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
                }`}
              >
                HI
              </button>
            </div>
          </div>

          {/* Article body */}
          <div ref={contentRef as React.RefObject<HTMLDivElement>} className="relative mt-8">
            <TextSelectionPopup containerRef={contentRef as React.RefObject<HTMLDivElement>} />
            <div className="prose prose-invert prose-sm md:prose-base max-w-none space-y-4">
              {story.content.split("\n\n").map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="text-foreground/85 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Like */}
          <div className="mt-10 pt-6 border-t border-border/50 flex items-center justify-between">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all ${
                liked
                  ? "border-mars-red bg-mars-red/10 text-mars-red"
                  : "border-border hover:border-mars-red/50 text-muted-foreground hover:text-mars-red"
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
              <span className="font-semibold">{likes}</span>
            </button>
            <p className="text-xs text-muted-foreground font-mono">
              Select any text to highlight or ask YURI
            </p>
          </div>
        </div>
      </motion.article>

      <div className="h-24" />
      <YuriChatbot />
    </div>
  );
};

export default StoryPage;
