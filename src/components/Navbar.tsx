import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/30">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
          </div>
          <span className="text-xl font-bold tracking-tight gradient-text">ZENITH</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/#stories" className="hover:text-primary transition-colors">Stories</Link>
          <Link to="/admin" className="hover:text-primary transition-colors">Write</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="text-sm px-4 py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-all"
          >
            ✍️ New Post
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
