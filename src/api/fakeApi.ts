import { ChatType } from "../types";

export const saveChatsToStorage = (chats: ChatType[]) => {
  localStorage.setItem("chats", JSON.stringify(chats));
};

export const getChatsFromStorage = (): ChatType[] => {
  const chats = localStorage.getItem("chats");
  return chats ? JSON.parse(chats) : [];
};
