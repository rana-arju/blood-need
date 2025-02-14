"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import io from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  sender: string;
  content: string;
  timestamp: Date;
}

export default function Chat({ recipientId }: { recipientId: string }) {
  const { data: session } = useSession();
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000"); // Replace with your server URL
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
      newSocket.emit("join", session?.user?.id);
    });

    newSocket.on("private message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [session]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && socket) {
      const message: Message = {
        sender: session?.user?.id as string,
        content: inputMessage,
        timestamp: new Date(),
      };
      socket.emit("private message", { recipientId, message });
      setMessages((prevMessages) => [...prevMessages, message]);
      setInputMessage("");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 overflow-y-auto mb-4 p-4 border rounded">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.sender === session?.user?.id ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  msg.sender === session?.user?.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {msg.content}
              </span>
              <div className="text-xs text-muted-foreground mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className="flex gap-2">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button type="submit">Send</Button>
        </form>
      </CardContent>
    </Card>
  );
}
