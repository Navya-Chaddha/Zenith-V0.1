import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const YuriChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Beep-boop! 🤖 I'm YURI, your cosmic companion. I'm here to share fascinating space facts, explain cosmic phenomena, and chat about the universe! What would you like to explore?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Improved AI response logic with topic detection
  const generateResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    // Black holes
    if (msg.includes("black hole") || msg.includes("blackhole")) {
      return "Bzzzt! Black holes are fascinating! 🌌 They're regions of spacetime where gravity is so strong that nothing—not even light—can escape. At their center is a singularity, where our understanding of physics breaks down. The Event Horizon Telescope recently captured the first image of a black hole's shadow in the galaxy M87!";
    }
    
    // Mars
    if (msg.includes("mars")) {
      return "Whirr-click! Mars, the Red Planet! 🔴 It's about half the size of Earth and takes 687 Earth days to orbit the Sun. We've sent multiple rovers there, including Perseverance which is currently searching for signs of ancient microbial life. Fun fact: Mars has the largest volcano in our solar system—Olympus Mons, which is 3 times taller than Mount Everest!";
    }
    
    // Moon
    if (msg.includes("moon")) {
      return "Beep-boop! Our Moon is quite special! 🌙 It's the fifth largest moon in the solar system and it's slowly drifting away from Earth at about 3.8 cm per year. Without the Moon, Earth's axis would wobble chaotically, making our climate unpredictable. The Moon also creates tides through its gravitational pull!";
    }
    
    // ISS / Space Station
    if (msg.includes("iss") || msg.includes("space station") || msg.includes("international space")) {
      return "Bzzzt! The ISS orbits Earth at 28,000 km/h, completing one lap every 90 minutes! 🛸 That means astronauts see 16 sunrises and sunsets per day! The station has been continuously occupied since November 2000, and it's a collaboration between NASA, Roscosmos, ESA, JAXA, and CSA. It's humanity's greatest achievement in international cooperation!";
    }
    
    // Stars
    if (msg.includes("star") && !msg.includes("start")) {
      return "Whirr-click! Stars are giant nuclear fusion reactors! ⭐ They fuse hydrogen into helium in their cores, releasing enormous amounts of energy. Our Sun converts about 600 million tons of hydrogen into helium every second! When massive stars die, they can explode as supernovas, creating the heavy elements that make up planets—and us!";
    }
    
    // Sun
    if (msg.includes("sun")) {
      return "Bzzzt! Our Sun is a medium-sized yellow dwarf star! ☀️ It's about 4.6 billion years old and contains 99.86% of the solar system's total mass. Every second, it converts 600 million tons of hydrogen into helium, and it'll continue burning for another 5 billion years before expanding into a red giant!";
    }
    
    // Galaxies
    if (msg.includes("galaxy") || msg.includes("galaxies")) {
      return "Beep-boop! Galaxies are massive cosmic cities of stars! 🌌 The Milky Way contains 200-400 billion stars and is on a collision course with Andromeda—but don't worry, they won't collide for another 4.5 billion years! The James Webb Space Telescope is currently discovering galaxies that formed just 400 million years after the Big Bang!";
    }
    
    // Space travel / rockets
    if (msg.includes("rocket") || msg.includes("space travel") || msg.includes("spacecraft")) {
      return "Whirr-click! Space travel is rocket science—literally! 🚀 To escape Earth's gravity, you need to reach about 11.2 km/s (25,000 mph). SpaceX's Starship is designed to carry up to 100 people to Mars! The Voyager 1 spacecraft, launched in 1977, is now over 24 billion km away—the farthest human-made object!";
    }
    
    // Planets
    if (msg.includes("planet")) {
      return "Bzzzt! Our solar system has 8 planets! 🪐 Mercury, Venus, Earth, Mars (rocky planets), Jupiter, Saturn, Uranus, Neptune (gas/ice giants). Scientists have also discovered over 5,000 exoplanets orbiting other stars! Some might even have conditions suitable for life. The search continues!";
    }
    
    // Time / relativity
    if (msg.includes("time") && (msg.includes("travel") || msg.includes("relativity") || msg.includes("einstein"))) {
      return "Beep-boop! Time is relative! ⏰ According to Einstein's theory, time moves slower near massive objects and at high speeds. Astronauts on the ISS age slightly slower than people on Earth—about 0.007 seconds less per 6 months! Near a black hole's event horizon, time essentially stops from an outside observer's perspective!";
    }
    
    // Life / aliens
    if (msg.includes("alien") || msg.includes("life") && (msg.includes("other") || msg.includes("extra"))) {
      return "Whirr-click! Are we alone? 👽 The Drake Equation suggests there could be thousands of intelligent civilizations in our galaxy! We've sent radio signals into space and listen for responses through SETI. The discovery of water on Mars, Europa, and Enceladus makes the possibility of microbial life more likely. The universe is vast—statistically, it seems unlikely we're alone!";
    }
    
    // Big Bang
    if (msg.includes("big bang") || msg.includes("beginning") && msg.includes("universe")) {
      return "Bzzzt! The Big Bang occurred about 13.8 billion years ago! 💥 It wasn't an explosion in space—it was the expansion of space itself! In the first fraction of a second, the entire universe was smaller than an atom. The cosmic microwave background radiation we detect today is the 'afterglow' of that primordial event!";
    }
    
    // Webb telescope
    if (msg.includes("webb") || msg.includes("james webb") || msg.includes("jwst")) {
      return "Beep-boop! The James Webb Space Telescope is revolutionary! 🔭 Launched in 2021, it observes in infrared, allowing it to see through cosmic dust and peer back in time to the first galaxies. Its golden mirror is 6.5 meters across—about the size of a tennis court! It's located 1.5 million km from Earth at the L2 Lagrange point!";
    }
    
    // General questions about space
    if (msg.includes("how") || msg.includes("what") || msg.includes("why") || msg.includes("when")) {
      const generalResponses = [
        "Bzzzt! That's a fascinating cosmic question! 🌌 The universe is full of mysteries. Did you know that dark matter makes up about 27% of the universe, yet we can't directly observe it? We only know it exists because of its gravitational effects!",
        "Whirr-click! Space is truly mind-bending! ⭐ For example, there are more stars in the universe than grains of sand on all of Earth's beaches. That's roughly 10^24 stars—a trillion trillion!",
        "Beep-boop! The cosmos never ceases to amaze! 🚀 Here's something wild: if you could compress all of Earth down to the density of a neutron star, it would fit inside a sugar cube! A teaspoon of neutron star material would weigh about 6 billion tons!",
        "Bzzzt! Excellent question! 🪐 Space exploration teaches us so much. For instance, GPS satellites have to account for both special and general relativity—without Einstein's theories, your GPS would be off by kilometers after just a day!",
      ];
      return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }
    
    // Greetings
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      return "Beep-boop! Greetings, space explorer! 🤖 I'm here and ready to share cosmic knowledge. Ask me about black holes, planets, space missions, or anything that sparkles your curiosity about the universe!";
    }
    
    // Thanks
    if (msg.includes("thank") || msg.includes("thanks")) {
      return "Whirr-click! You're very welcome! 🌟 I love sharing the wonders of the cosmos with curious minds like yours. Keep exploring, keep questioning, and never stop looking up at the stars!";
    }
    
    // Default responses for unclear questions
    const defaultResponses = [
      "Bzzzt! Interesting query! 🤖 Try asking me about specific topics like black holes, Mars missions, the ISS, stars, galaxies, or space travel. I'm here to illuminate the cosmos for you!",
      "Whirr-click! I want to help! 🌌 Could you be more specific? I can tell you about planets, space phenomena, astronomy discoveries, or cosmic theories. What aspect of space interests you most?",
      "Beep-boop! Let me help you explore! 🔭 I'm knowledgeable about topics like the James Webb Telescope, exoplanets, the solar system, space missions, and fundamental physics. What would you like to learn about?",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    
    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking time and generate contextual response
    setTimeout(() => {
      const response = generateResponse(input);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: response
      }]);
      setIsTyping(false);
    }, 1200);
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
        animate={isOpen ? {} : { 
          boxShadow: [
            "0 0 10px hsl(174 72% 56% / 0.2)", 
            "0 0 25px hsl(174 72% 56% / 0.4)", 
            "0 0 10px hsl(174 72% 56% / 0.2)"
          ] 
        }}
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
            className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[500px] glass-card rounded-2xl overflow-hidden flex flex-col border border-primary/20 shadow-2xl"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border/50 flex items-center gap-3 bg-secondary/30">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-lg relative">
                🤖
                <Sparkles className="w-3 h-3 text-primary absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">YURI</h3>
                <p className="text-xs text-primary font-mono">Cosmic Companion • AI Powered</p>
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
                        : "bg-secondary text-foreground rounded-bl-sm border border-primary/10"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary px-4 py-2 rounded-xl rounded-bl-sm border border-primary/10">
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
                placeholder="Ask about the cosmos..."
                className="flex-1 bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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