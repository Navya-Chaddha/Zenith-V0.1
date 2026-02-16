import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const YuriChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Beep-boop! 🤖 I'm YURI, your space companion droid. Ask me anything about the cosmos!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Mock response for now — will connect to AI later
    setTimeout(() => {
      const responses = [
        "Bzzzt! That's a fascinating question about space. The universe is approximately 13.8 billion years old, and it's expanding faster than ever! 🌌",
        "Beep-boop! Did you know that a day on Venus is longer than its year? Venus takes 243 Earth days to rotate but only 225 days to orbit the Sun! 🪐",
        "Whirr-click! Neutron stars are so dense that a teaspoon of their material would weigh about 6 billion tons on Earth! ⭐",
        "Bzzzt! The Voyager 1 spacecraft, launched in 1977, is now over 24 billion kilometers from Earth — the farthest any human-made object has traveled! 🚀",
      ];
      setMessages(prev => [...prev, {
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)]
      }]);
      setIsTyping(false);
    }, 1500);
  }, [input]);

  // Listen for custom event to open with selected text
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setIsOpen(true);
      const text = e.detail?.text;
      if (text) {
        setInput(`Tell me more about: "${text}"`);
      }
    };
    window.addEventListener("ask-yuri" as any, handler);
    return () => window.removeEventListener("ask-yuri" as any, handler);
  }, []);

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-secondary border-2 border-primary/50 flex items-center justify-center shadow-lg hover:shadow-primary/20 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? {} : { boxShadow: ["0 0 10px hsl(174 72% 56% / 0.2)", "0 0 25px hsl(174 72% 56% / 0.4)", "0 0 10px hsl(174 72% 56% / 0.2)"] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-primary" />
        ) : (
          <span className="text-2xl">🤖</span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[500px] glass-card rounded-2xl overflow-hidden flex flex-col border border-primary/20"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border/50 flex items-center gap-3 bg-secondary/30">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-lg">
                🤖
              </div>
              <div>
                <h3 className="font-semibold text-sm">YURI</h3>
                <p className="text-xs text-primary font-mono">Space Companion Droid • Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[340px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary px-4 py-2 rounded-xl rounded-bl-sm">
                    <span className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Ask YURI anything..."
                className="flex-1 bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground"
              />
              <button
                onClick={handleSend}
                className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default YuriChatbot;
