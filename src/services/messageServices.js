import { messageModel } from "../Dao/DB/models/messagesModel.js";

export async function getRecentMessages(limit = 10) {
  const messages = await messageModel.find().sort({ date: -1 }).limit(limit).exec();
  return messages.reverse();
}

export async function saveMessage(content, sender) {
  const message = new messageModel({
    content,
    sender
  });
  await message.save();
  return message;
}

