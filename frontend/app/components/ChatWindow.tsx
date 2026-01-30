import { MessageType } from "@/app/page";
import { useRef, useEffect } from "react";
import Message from "./Message";

type Props = {
  messages: MessageType[];
};

export default function ChatWindow({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages come
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[60vh] overflow-y-auto pr-2">
      <div className="space-y-2">
        {messages.map((msg, i) => (
          <Message key={i} role={msg.role} content={msg.content} />
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}