import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChatType } from "../types";

const Home = () => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChatName, setNewChatName] = useState("");

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("chats") || "[]");
    setChats(savedChats);
  }, []);

  const saveChats = (updatedChats) => {
    setChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));
  };

  const addChat = () => {
    if (!newChatName.trim()) return;
    const newChat = {
      id: Date.now(),
      name: newChatName,
      avatar: "https://i.imgur.com/wPR0zYg.jpeg",
    };
    saveChats([...chats, newChat]);
    setNewChatName("");
    setIsModalOpen(false);
  };

  const deleteChat = (id) => {
    const updatedChats = chats.filter((chat) => chat.id !== id);
    saveChats(updatedChats);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chats</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Create Chat
        </button>
      </header>
      <ul className="space-y-4">
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="flex items-center space-x-4 bg-gray-800 shadow-md p-4 rounded-lg"
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full"
            />
            <Link
              href={`/chat/${chat.id}`}
              className="text-blue-400 hover:underline text-lg flex-grow"
            >
              {chat.name}
            </Link>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => deleteChat(chat.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 text-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create a new chat</h2>
            <input
              type="text"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              className="border border-gray-600 bg-gray-700 px-4 py-2 rounded w-full mb-4"
              placeholder="Chat name"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-600 px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 px-4 py-2 rounded"
                onClick={addChat}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
