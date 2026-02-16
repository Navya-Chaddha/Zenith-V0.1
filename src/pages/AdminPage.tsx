import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Image as ImageIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

const AdminPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate home. Will connect to backend later.
    alert("Story saved locally! Connect a backend to persist.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs font-mono text-primary tracking-[0.2em] uppercase mb-2">Mission Control</p>
          <h1 className="text-3xl md:text-4xl font-bold">Write a New Story</h1>
          <p className="text-muted-foreground mt-2">Craft your next cosmic dispatch.</p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label className="block text-sm font-mono text-muted-foreground mb-2">Title</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="The Cosmic Mystery of..."
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground/50"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-mono text-muted-foreground mb-2">Category</label>
                <input
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  placeholder="Deep Space"
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-muted-foreground mb-2">Cover Image</label>
                <button
                  type="button"
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 flex items-center gap-2 text-muted-foreground hover:border-primary/50 transition-colors"
                >
                  <ImageIcon className="w-4 h-4" />
                  Upload Image
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-mono text-muted-foreground mb-2">Excerpt</label>
              <textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                placeholder="A brief teaser for the story..."
                rows={2}
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-muted-foreground mb-2">Story Content</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Write your cosmic tale here... Use double line breaks for paragraphs."
                rows={14}
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground/50 leading-relaxed"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all glow-border"
            >
              <Send className="w-4 h-4" />
              Publish Story
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
