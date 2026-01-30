"use client";
import { useState, KeyboardEvent } from "react";
import { FiSend, FiMic } from "react-icons/fi";
import axios from "axios";
import { MessageType } from "@/app/page";

type Props = {
  onSend: (msg: MessageType) => void;
};

export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!text.trim() || loading) return;

    // Add user message
    onSend({ role: "user", content: text });
    const userMessage = text;
    setText("");
    setLoading(true);

    try {
      // Call backend
      const response = await axios.post("http://localhost:4000/api/chat", {
        message: userMessage,
      });

      // Add AI response
      if (response.data?.reply) {
        onSend({ role: "AI", content: response.data.reply });
      } else {
        throw new Error("No reply from server");
      }
    } catch (err) {
      console.error("Error:", err);
      onSend({
        role: "AI",
        content: "Sorry, I'm having trouble responding. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl p-2">
      <div className="flex items-end">
        {/* Textarea */}
        <div className="flex-1 relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your message here..."
            className="w-full bg-transparent text-white placeholder-gray-500 
                     resize-none outline-none px-4 py-3 pr-12"
            rows={1}
            disabled={loading}
          />

          {/* Character count */}
          {text.length > 0 && (
            <div className="absolute bottom-2 right-3 text-xs text-gray-500">
              {text.length}
            </div>
          )}
        </div>

        {/* Right buttons */}
        <div className="flex items-center space-x-2 ml-2">
          
          <button
            onClick={handleSend}
            disabled={!text.trim() || loading}
            className={`
              p-3 rounded-xl transition-all duration-200
              ${
                !text.trim() || loading
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg"
              }
            `}
            title="Send message"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiSend />
            )}
          </button>
        </div>
      </div>

      {/* Helper text */}
      <div className="px-2 pt-2 border-t border-gray-800 mt-2">
        <p className="text-xs text-gray-500 text-center">
          Press{" "}
          <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Enter</kbd> to
          send
        </p>
      </div>
    </div>
  );
}
