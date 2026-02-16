import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Image as ImageIcon, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";

const AdminPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  // TODO: Replace this with your actual secure password
  // For production, use environment variables and backend authentication
  const ADMIN_PASSWORD = "Nav0222Zen"; // Change this to your secure password!

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password. Access denied.");
      setPassword("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate home. Will connect to backend later.
    alert("Story saved locally! Connect a backend to persist.");
    navigate("/");
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="glass-card rounded-2xl p-8 border border-primary/20">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Admin Access</h1>
                <p className="text-sm text-muted-foreground">
                  This area is restricted to authorized personnel only.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground/50"
                    autoFocus
                  />
                </div>

                {authError && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                  >
                    {authError}
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all glow-border"
                >
                  <Lock className="w-4 h-4" />
                  Access Mission Control
                </button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-6">
                Unauthorized access attempts are logged and monitored.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Admin interface (only shown after authentication)
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-mono text-primary tracking-[0.2em] uppercase mb-2">
                Mission Control
              </p>
              <h1 className="text-3xl md:text-4xl font-bold">Write a New Story</h1>
              <p className="text-muted-foreground mt-2">Craft your next cosmic dispatch.</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-sm px-4 py-2 rounded-lg border border-border hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-500 transition-all"
            >
              Logout
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-mono text-muted-foreground mb-2">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="The Cosmic Mystery of..."
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground/50"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-mono text-muted-foreground mb-2">
                  Category
                </label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Deep Space"
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-muted-foreground mb-2">
                  Cover Image
                </label>
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
              <label className="block text-sm font-mono text-muted-foreground mb-2">
                Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief teaser for the story..."
                rows={2}
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-muted-foreground mb-2">
                Story Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
