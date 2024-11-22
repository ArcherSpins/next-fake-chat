import { NextApiRequest, NextApiResponse } from "next";
import { MessageType } from "../../../types";

let messages: { [key: string]: MessageType[] } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };

  if (req.method === "GET") {
    res.status(200).json(messages[id] || []);
  } else if (req.method === "DELETE") {
    delete messages[id];
    res.status(200).json({ message: "Messages deleted" });
  } else if (req.method === "POST") {
    messages[id] = req.body;
    res.status(200).json({ message: "Messages updated" });
  }
}
