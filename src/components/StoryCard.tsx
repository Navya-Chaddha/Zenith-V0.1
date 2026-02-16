import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Story } from "@/data/stories";

interface StoryCardProps {
  story: Story;
  index: number;
}

const StoryCard = ({ story, index }: StoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={`/story/${story.id}`} className="group block">
        <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(174_72%_56%/0.1)]">
          <div className="relative h-48 overflow-hidden">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            <span className="absolute top-3 left-3 text-xs font-mono tracking-wider text-primary bg-background/70 backdrop-blur-sm px-3 py-1 rounded-full">
              {story.category}
            </span>
          </div>
          <div className="p-5">
            <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {story.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {story.excerpt}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>{story.date}</span>
              <span>{story.readTime} read</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StoryCard;
