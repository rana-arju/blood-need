"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, X, Send, Smile } from "lucide-react"
import { cn } from "@/lib/utils"

interface WhatsAppChatProps {
  whatsappNumber: string
  initialMessage?: string
  onClose: () => void
}

export function WhatsAppChat({
  whatsappNumber,
  initialMessage = "হ্যালো, আমি কিছু জানতে চাই / আমার একটি সমস্যা হয়েছে। দয়া করে সাহায্য করুন।",
  onClose,
}: WhatsAppChatProps) {
  const [message, setMessage] = useState(initialMessage)
  const [showChat, setShowChat] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    // Set current time format
    const now = new Date()
    setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))

    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSend = () => {
    if (message.trim()) {
      // Encode the message for the URL
      const encodedMessage = encodeURIComponent(message)
      // Open WhatsApp with the pre-filled message
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  const toggleChat = () => {
    setShowChat(!showChat)
  }

  return (
    <div className="w-[300px] md:w-[400px]  z-50 absolute bottom-20 right-0 mb-4 rounded-lg shadow-lg overflow-hidden animate-fade-in-up">
      {/* Header */}
      <div className="bg-green-500 dark:bg-green-600 px-4 py-3 flex justify-between items-center text-white">
        <div className="flex items-center">
          <WhatsAppLogo />
          <span className="ml-2 font-medium">WhatsApp Chat</span>
        </div>
        <button
          onClick={toggleChat}
          className="p-1 rounded-full hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
          aria-label={showChat ? "Minimize chat" : "Expand chat"}
        >
          <ChevronDown className={cn("w-5 h-5 transition-transform", !showChat && "rotate-180")} />
        </button>
      </div>

      {/* Chat Body */}
      {showChat && (
        <div className="bg-[url('https://res.cloudinary.com/db8l1ulfq/image/upload/v1743166210/whatsapp_b6xlxs.png')] bg-repeat bg-gray-100 dark:bg-gray-800 h-64 p-4 overflow-y-auto">
          <div className="max-w-[85%] bg-white dark:bg-gray-700 rounded-lg p-3 ml-auto shadow-sm">
            <div className="text-gray-800 dark:text-gray-200 text-sm">
                <p className="text-md font-bold  text-gray-800 dark:text-gray-200">
                💬 স্বাগতম Blood Need কমিউনিটিতে!
                </p>
          
আমরা রক্তদাতা ও রক্তপ্রত্যাশীদের সংযোগ করতে সাহায্য করি। আপনাকে কীভাবে সাহায্য করতে পারি? 🩸🙏
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">{currentTime}</p>
          </div>
        </div>
      )}

      {/* Input Area */}
      {showChat && (
        <div className="bg-gray-50 dark:bg-gray-900 p-3 flex items-center">
          <button
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors mr-2"
            aria-label="Add emoji"
          >
            <Smile className="w-5 h-5" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write your message..."
            className="flex-1 py-2 px-3 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 dark:text-gray-200"
            aria-label="Message input"
          />
          <button
            onClick={handleSend}
            className="p-2 ml-2 bg-green-500 dark:bg-green-600 rounded-full text-white hover:bg-green-600 dark:hover:bg-green-700 transition-colors disabled:opacity-60 disabled:pointer-events-none"
            disabled={!message.trim()}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute -bottom-14 right-4 w-10 h-10 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center text-white shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        aria-label="Close chat"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}

function WhatsAppLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm.031 5.462c3.879 0 7.035 3.155 7.035 7.035 0 1.363-.395 2.683-1.159 3.833l.707 3.392-3.525-.722a6.962 6.962 0 01-3.057.697c-3.88 0-7.035-3.155-7.035-7.035 0-3.879 3.155-7.2 7.035-7.2zm3.781 10.255a1.428 1.428 0 00.918-.427c.248-.248.385-.578.378-.928a1.458 1.458 0 00-.378-.928 1.458 1.458 0 00-.919-.427h-1.407c-.376 0-.708.142-.95.412l-.126.127c-.25.25-.376.587-.376.95 0 .365.126.701.376.95l.126.127c.242.27.574.412.95.412h1.408zm-4.734-6.28h-.065a.563.563 0 00-.398.17l-.126.128a.593.593 0 00-.146.396v3.61c0 .295.12.588.328.796.209.209.502.329.796.329h3.553c.3 0 .562-.125.755-.332a1.14 1.14 0 00.312-.793c0-.296-.104-.557-.294-.736l-.152-.143a1.023 1.023 0 00-.736-.314h-2.083a.43.43 0 01-.432-.432v-2.246a.563.563 0 00-.17-.398l-.128-.126a.563.563 0 00-.403-.17h-.062z" />
    </svg>
  )
}

