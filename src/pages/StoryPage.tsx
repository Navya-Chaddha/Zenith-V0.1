import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Volume2, VolumeX } from "lucide-react";
import { db, auth } from "@/lib/firebase"; // Import auth for likes
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import TextSelectionPopup from "@/components/TextSelectionPopup";
import Navbar from "@/components/Navbar";
import YuriChatbot from "@/components/YuriChatbot";

const StoryPage = () => {
  const { id } = useParams();
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const contentRef = useRef<HTMLDivElement>(null);

  // FETCH LIVE STORY DATA
  useEffect(() => {
    if (!id) return;
    const docRef = doc(db, "stories", id);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setStory({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  const userId = auth.currentUser?.uid;
  const liked = story?.likes?.includes(userId);
  const likesCount = story?.likes?.length || 0;

  const handleLike = async () => {
    if (!userId) {
      alert("Please login to like this dispatch!");
      return;
    }
    if (!id) return;

    const storyRef = doc(db, "stories", id);
    try {
      await updateDoc(storyRef, {
        likes: liked ? arrayRemove(userId) : arrayUnion(userId)
      });
    } catch (err) {
      console.error("Error updating likes", err);
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

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">Retrieving Transmission...</div>;
  if (!story) return <div className="min-h-screen flex items-center justify-center"><p>Story lost in space.</p></div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative h-[50vh] overflow-hidden">
        <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative -mt-32 z-10 max-w-3xl mx-auto px-6"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to stories
        </Link>

        <div className="glass-card rounded-2xl p-8 md:p-12">
          <span className="text-xs font-mono text-primary tracking-[0.2em] uppercase">{story.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 leading-tight">{story.title}</h1>
          <p className="text-muted-foreground mt-2 font-mono text-sm">
            {story.createdAt?.toDate().toLocaleDateString()} • {story.readTime || '5 min'} read
          </p>

          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <button
              onClick={handleReadAloud}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-all ${isReading ? "border-primary bg-primary/10 text-primary" : "border-border"}`}
            >
              {isReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              {isReading ? "Stop Reading" : "Read Aloud"}
            </button>
          </div>

          <div ref={contentRef} className="relative mt-8">
            <TextSelectionPopup containerRef={contentRef as React.RefObject<HTMLDivElement>} />
            <div className="prose prose-invert prose-sm md:prose-base max-w-none space-y-4">
              {story.content.split("\n\n").map((paragraph: string, i: number) => (
                <motion.p key={i} className="text-foreground/85 leading-relaxed">{paragraph}</motion.p>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border/50 flex items-center justify-between">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all ${liked ? "border-mars-red bg-mars-red/10 text-mars-red" : "border-border text-muted-foreground"}`}
            >
              <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
              <span className="font-semibold">{likesCount}</span>
            </button>
          </div>
        </div>
      </motion.article>
      <YuriChatbot />
    </div>
  );
};

export default StoryPage;