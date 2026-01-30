"use client";
import { useState, useRef, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

export type MessageType = {
  role: "user" | "AI";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<MessageType[]>([
    { role: "AI", content: "Hello! How can I help you today?" },
  ]);

  // Add a new message to chat
  const addMessage = (msg: MessageType) => {
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl flex items-center justify-center">
            <span className="font-bold text-white">AT</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Astro-Talk</h1>
            <p className="text-sm text-gray-400">Ask me anything</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-4 md:p-6 min-h-[70vh]">
          <ChatWindow messages={messages} />
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-black/50 backdrop-blur-md border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <ChatInput onSend={addMessage} />
        </div>
      </div>
    </div>
  );
}
