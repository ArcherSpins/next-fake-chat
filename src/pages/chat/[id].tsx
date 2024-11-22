import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { BackgroundAnimation } from "../../components/BackgroundAnimation";
import { ChatType, MessageType } from "../../types";

interface ChatPageProps {
  chat: ChatType | null;
}
const ChatPage: React.FC<ChatPageProps> = ({ chat }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const emojiList = ["😀", "🎉", "🐼", "💖", "🔥"];

  useEffect(() => {
    if (chat?.id) {
      const savedMessages = JSON.parse(
        localStorage.getItem(`messages-${chat.id}`) || "[]"
      );
      setMessages(savedMessages);
    }
  }, [chat?.id]);

  useEffect(() => {
    if (chat?.id) {
      localStorage.setItem(`messages-${chat.id}`, JSON.stringify(messages));
    }
  }, [messages, chat?.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const message = {
      id: Date.now(),
      text: newMessage,
    };
    setMessages([...messages, message]);
    setNewMessage("");
    scrollToBottom();
  };

  const addEmoji = (emoji: string) => {
    setNewMessage(newMessage + emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative p-6 min-h-screen bg-gradient-to-br from-gray-900 text-white overflow-hidden">
      <BackgroundAnimation />
      <header className="relative z-10 flex items-center space-x-4 mb-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
          onClick={() => router.push("/")}
        >
          Back
        </button>
        <h1 className="text-3xl font-extrabold">{chat?.name || "Chat Room"}</h1>
      </header>
      <motion.div
        className="relative z-10 bg-gray-800 shadow-lg p-4 rounded-lg mb-4 h-96 overflow-y-auto"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0 }}
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            className="mb-4 flex justify-end"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-gray-300 bg-gray-700 px-4 py-2 rounded-lg">
              {msg.text}
            </p>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </motion.div>
      <div className="relative z-10 flex space-x-2 items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border border-gray-600 bg-gray-700 px-4 py-2 rounded-lg w-full text-white shadow"
          placeholder="Type a message..."
        />
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg shadow"
        >
          😊
        </button>
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Send
        </button>
        {showEmojiPicker && (
          <div
            className="absolute bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg z-20"
            style={{ bottom: "-80px", right: "20px" }}
          >
            {emojiList.map((emoji) => (
              <button
                key={emoji}
                onClick={() => addEmoji(emoji)}
                className="text-lg px-3 py-1 hover:bg-gray-700 rounded-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* <AnimatedCharacter /> */}
    </div>
  );
};

export default ChatPage;

export async function getServerSideProps(context) {
  const { id } = context.params;

  const chat = {
    id,
    name: `Chat Room ${id}`,
  };

  return {
    props: {
      chat,
    },
  };
}
