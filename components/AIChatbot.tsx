"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I assist you with blood donation today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    // Simulate bot response (in a real application, this would be an API call to an AI service)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Thank you for your question. I'm processing your request and will respond shortly.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Chat with our AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <ScrollArea className="flex-grow mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`flex items-start ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={
                      message.sender === "user"
                        ? "/avatars/user.jpg"
                        : "/avatars/bot.jpg"
                    }
                    alt={message.sender}
                  />
                  <AvatarFallback>
                    {message.sender === "user" ? "U" : "B"}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`mx-2 p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}
