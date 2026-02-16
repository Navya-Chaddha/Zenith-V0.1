import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Image as ImageIcon, LogIn } from "lucide-react";
import Navbar from "@/components/Navbar";
import { auth, db, googleProvider } from "@/lib/firebase";
import { signInWithPopup, onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const AdminPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(""); // Simplified for Tonight

  // YOUR GMAIL GOES HERE
  const ADMIN_EMAIL = "your-email@gmail.com"; 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login Error", err);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "stories"), {
        title,
        category,
        excerpt,
        content,
        image,
        likes: [], // To handle likes later
        featured: false,
        createdAt: serverTimestamp(),
        author: user?.displayName
      });
      alert("Story Published to the Stars!");
      navigate("/");
    } catch (err) {
      alert("Error publishing story.");
      console.error(err);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono">Verifying Credentials...</div>;

  // Access Control: If no user or wrong email
  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
          <div className="glass-card rounded-2xl p-8 border border-primary/20 text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4">Admin Mission Control</h1>
            <p className="text-muted-foreground mb-6">Please sign in with your authorized Google account.</p>
            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all"
            >
              <LogIn className="w-4 h-4" /> Login with Google
            </button>
            {user && user.email !== ADMIN_EMAIL && (
              <p className="text-red-500 text-sm mt-4">Unauthorized: {user.email} is not the admin.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-mono text-primary tracking-[0.2em] uppercase mb-2">Authenticated: {user.displayName}</p>
            <h1 className="text-3xl md:text-4xl font-bold">Write a New Story</h1>
          </div>
          <button onClick={handleLogout} className="text-sm px-4 py-2 rounded-lg border border-border hover:bg-red-500/10 hover:text-red-500">Logout</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3" required />
          
          <div className="grid grid-cols-2 gap-4">
            <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category (e.g. Deep Space)" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3" required />
            <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Cover Image URL" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3" required />
          </div>

          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Excerpt (Short teaser)" rows={2} className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3" required />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Story Content..." rows={10} className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3" required />

          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all">
            <Send className="w-4 h-4" /> Publish Story
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;