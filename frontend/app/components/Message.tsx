type Props = {
  role: "user" | "AI";
  content: string;
};

export default function Message({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 animate-fadeIn`}>
      <div className={`flex max-w-[85%] md:max-w-[70%] ${isUser ? "flex-row-reverse" : ""}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 mx-3 ${isUser ? "ml-2" : "mr-2"}`}>
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center
            ${isUser 
              ? "bg-gradient-to-r from-blue-700 to-blue-900" 
              : "bg-gradient-to-r from-purple-950 to-pink-900"
            }
          `}>
            <span className="text-white font-bold">
              {isUser ? "U" : "AI"}
            </span>
          </div>
        </div>

        {/* Message Bubble */}
        <div className="flex flex-col">
          <div className="mb-1 px-1">
            <span className={`text-xs font-medium ${
              isUser ? "text-blue-300" : "text-purple-300"
            }`}>
              {isUser ? "You" : "AI Assistant"}
            </span>
          </div>
          
          <div
            className={`
              px-5 py-3 rounded-2xl break-words shadow-md
              ${isUser
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                : "bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-none"
              }
            `}
          >
            <div className="whitespace-pre-wrap leading-relaxed">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}