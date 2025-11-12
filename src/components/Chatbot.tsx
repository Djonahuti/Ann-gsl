// components/Chatbot.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, MessageCircle, Phone } from "lucide-react";
import { createXai } from "@ai-sdk/xai";
import { generateText } from "ai";

const xai = createXai({
  apiKey: import.meta.env.VITE_XAI_API_KEY,
});

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input.trim();
    setInput("");
    setIsLoading(true);

    try {
      let assistantContent = "";

      // === SPECIAL CASE: User says "yes" after investment prompt ===
      const lastBotMessage = [...messages].reverse().find(m => m.role === "assistant")?.content;
      const isInvestmentPrompt = lastBotMessage?.includes("Ready to begin?");

      if (isInvestmentPrompt && userInput.toLowerCase() === "yes") {
        assistantContent = "Visit our Office to enroll or chat us on WhatsApp, we reply less than a minute";
      } else {
        // === Try Grok AI ===
        if (import.meta.env.VITE_XAI_API_KEY) {
          const { text } = await generateText({
            model: xai("grok-beta"),
            prompt: `You are Annhurst Assistant, a helpful investment advisor for Annhurst Global. Keep responses short, professional, and focused on investments (bus hire, debt notes, 25% returns, ₦65,000 min). End with a call-to-action. User: ${userInput}`,
          });
          assistantContent = text;
        } else {
          assistantContent = getFallbackResponse(userInput);
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("AI Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: getFallbackResponse(userInput),
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackResponse = (userInput: string): string => {
    const lower = userInput.toLowerCase();
    if (lower.includes("invest") || lower.includes("start")) {
      return "Start investing with just ₦65,000! Up to 25% returns in 6-12 months. Ready to begin?";
    } else if (lower.includes("bus") || lower.includes("hire")) {
      return "Our Bus Hire Purchase: Own your bus with ₦40,000 weekly payments. Contact us!";
    } else if (lower.includes("contact") || lower.includes("call")) {
      return "Call +234 809 348 7556 (9am-5pm) or email customerservices@annhurst-gsl.com.";
    }
    return "We're here to help with secure investments. What's your goal?";
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-25 right-6 z-50 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm hidden md:inline">Chat</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 h-100 bg-white rounded-2xl shadow-2xl flex flex-col border border-purple-400 z-50 space-y-2"
          >
            {/* Header */}
            <div className="p-4 bg-linear-to-r from-purple-600 to-pink-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gray-200 shadow-md shadow-red-500/30 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-30/50">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/ann1.png" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="font-semibold">Annhurst Assistant</h3>
                  <Badge variant="secondary" className="text-xs">Online</Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Avatar className="w-12 h-12 mx-auto mb-2 rounded-full shadow-lg shadow-purple-500/30">
                    <AvatarImage src="/big.jpg" />
                    <AvatarFallback>
                        <Bot className="w-11 h-11 mx-auto opacity-50" />
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm">Hi! Ask about investments, returns, or bus hire.</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                        msg.role === "user"
                          ? "bg-purple-600 text-white"
                          : "bg-white text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
              <div ref={messagesEndRef} />
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-600 rounded-full animate-pulse" />
                      <p className="text-sm">Typing...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-2 border-t bg-white">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 min-h-20 resize-none focus-visible:ring-purple-600"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <Button onClick={handleSend} disabled={!input.trim() || isLoading} size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex justify-center mt-2">
                <Button variant="link" size="sm" onClick={() => window.open("https://wa.me/2348093487556", "_blank")}>
                  <Phone className="w-4 h-4 mr-1" />
                  WhatsApp Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}