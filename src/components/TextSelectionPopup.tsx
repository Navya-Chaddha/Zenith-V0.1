import { useState, useCallback, useEffect, useRef } from "react";
import { Highlighter, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TextSelectionPopupProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const TextSelectionPopup = ({ containerRef }: TextSelectionPopupProps) => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");

  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (text && text.length > 2 && containerRef.current?.contains(selection?.anchorNode || null)) {
      const range = selection!.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = containerRef.current!.getBoundingClientRect();
      setPosition({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top - 10,
      });
      setSelectedText(text);
      setShow(true);
    } else {
      setShow(false);
    }
  }, [containerRef]);

  const handleMouseDown = useCallback(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleMouseUp, handleMouseDown]);

  const handleHighlight = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.className = "text-highlight";
      range.surroundContents(span);
    }
    setShow(false);
  };

  const handleAskYuri = () => {
    window.dispatchEvent(new CustomEvent("ask-yuri", { detail: { text: selectedText } }));
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 5, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.9 }}
          className="absolute z-40 flex gap-1 glass-card rounded-lg p-1 border border-primary/20"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          <button
            onClick={handleHighlight}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md hover:bg-primary/10 transition-colors text-primary"
          >
            <Highlighter className="w-3.5 h-3.5" />
            Highlight
          </button>
          <button
            onClick={handleAskYuri}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md hover:bg-primary/10 transition-colors text-primary"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Ask YURI
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TextSelectionPopup;
