import { NextApiRequest, NextApiResponse } from "next";
import { ChatType } from "../../../types";

let chats: ChatType[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const chat = chats.find((c) => c.id === Number(id));
  if (chat) {
    res.status(200).json(chat);
  } else {
    res.status(404).json({ message: "Chat not found" });
  }
}
