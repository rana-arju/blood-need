"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  MessageSquare,
  X,
  Send,
  Maximize,
  Minimize,
  Droplet,
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm BloodBuddy, your blood donation assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (
      lowerCaseMessage.includes("eligib") ||
      lowerCaseMessage.includes("can i donate")
    ) {
      return "To be eligible to donate blood, you generally need to be at least 17 years old (16 with parental consent in some states), weigh at least 110 pounds, and be in good general health. Would you like me to check specific eligibility criteria for you?";
    } else if (
      lowerCaseMessage.includes("blood type") ||
      lowerCaseMessage.includes("compatibility")
    ) {
      return "There are 8 main blood types: A+, A-, B+, B-, AB+, AB-, O+, and O-. O- is the universal donor (can give to anyone), while AB+ is the universal recipient (can receive from anyone). Would you like to know more about a specific blood type?";
    } else if (
      lowerCaseMessage.includes("where") ||
      lowerCaseMessage.includes("location") ||
      lowerCaseMessage.includes("center")
    ) {
      return "You can donate blood at local blood centers, hospitals, and mobile blood drives. Would you like me to help you find the nearest donation center to your location?";
    } else if (lowerCaseMessage.includes("thank")) {
      return "You're welcome! Thank you for your interest in blood donation. Every donation can save up to three lives!";
    } else if (
      lowerCaseMessage.includes("how long") ||
      lowerCaseMessage.includes("time") ||
      lowerCaseMessage.includes("process")
    ) {
      return "The entire blood donation process takes about an hour, though the actual donation only takes 8-10 minutes. After donating, you'll spend about 15 minutes in the refreshment area recovering.";
    } else if (
      lowerCaseMessage.includes("how often") ||
      lowerCaseMessage.includes("frequency")
    ) {
      return "You can donate whole blood every 56 days (8 weeks). Platelets can be donated more frequently, up to 24 times per year.";
    } else if (
      lowerCaseMessage.includes("afraid") ||
      lowerCaseMessage.includes("scared") ||
      lowerCaseMessage.includes("nervous") ||
      lowerCaseMessage.includes("fear")
    ) {
      return "It's completely normal to feel nervous about donating blood, especially if it's your first time. The staff at donation centers are experienced in helping first-time donors feel comfortable. The discomfort is minimal and brief, and the process is very safe. Would you like some tips to help with donation anxiety?";
    } else {
      return "I'm here to help with any questions about blood donation. You can ask about eligibility requirements, the donation process, finding donation centers, blood type compatibility, or how your donation helps others. What would you like to know?";
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-20 md:bottom-6 right-6 rounded-full z-40 flex items-center justify-center w-14 h-14  bg-primary text-white shadow-lg"
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed ${
            isMinimized
              ? "bottom-16 md:bottom-6 right-6 w-72"
              : "bottom-16 md:bottom-6 right-6 w-80 sm:w-96"
          } z-40 transition-all duration-300 ease-in-out`}
        >
          <Card className="shadow-xl border-blood-100 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-primary text-white p-3 flex items-center justify-between">
              <div className="flex items-center">
                <Droplet className="h-5 w-5 mr-2" />
                <span className="font-semibold text-sm md:text-md">Blood Need Assistant</span>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white hover:bg-blood-700 rounded-full"
                  onClick={toggleMinimize}
                  aria-label={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? (
                    <Maximize className="h-4 w-4" />
                  ) : (
                    <Minimize className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white hover:bg-primary rounded-full"
                  onClick={toggleChat}
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            {!isMinimized && (
              <div className="h-56 md:h-80 overflow-y-auto p-3 bg-white">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-3 ${
                      msg.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div 
                      className={`inline-block px-3 py-2 rounded-lg max-w-xs lg:max-w-md ${
                        msg.sender === "user"
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="text-xs mt-1 text-gray-500">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Chat Input */}
            {!isMinimized && (
              <form onSubmit={handleSendMessage} className="border-t flex p-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow mr-2"
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 bg-blood-600 text-primary hover:bg-blood-700 rounded-full"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBot;
