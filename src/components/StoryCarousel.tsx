import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Story } from "@/data/stories";

interface StoryCarouselProps {
  stories: Story[];
}

const StoryCarousel = ({ stories }: StoryCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16" id="stories">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-mono text-primary tracking-[0.2em] uppercase mb-1">Featured</p>
            <h2 className="text-3xl md:text-4xl font-bold">Top Stories</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 px-6 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Duplicate for infinite feel */}
        {[...stories, ...stories].map((story, i) => (
          <Link
            key={`${story.id}-${i}`}
            to={`/story/${story.id}`}
            className="group flex-shrink-0 w-[340px] snap-start"
          >
            <motion.div
              whileHover={{ y: -4 }}
              className="glass-card rounded-xl overflow-hidden h-full transition-all duration-300 hover:border-primary/30"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-mono text-primary tracking-wider">
                    {story.category}
                  </span>
                  <h3 className="text-base font-semibold mt-1 leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {story.title}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{story.excerpt}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>❤ {story.likes}</span>
                  <span>{story.readTime}</span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default StoryCarousel;
