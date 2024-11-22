import { NextApiRequest, NextApiResponse } from "next";
import { ChatType } from "../../types";

let chats: ChatType[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(chats);
  } else if (req.method === "POST") {
    chats = req.body;
    res.status(200).json({ message: "Chats updated" });
  }
}
