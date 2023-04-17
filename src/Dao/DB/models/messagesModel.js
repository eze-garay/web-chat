import mongoose from "mongoose";


const Schema = new mongoose.Schema({
  content: String,
  sender: String,
  date: { type: Date, default: Date.now }
});

export const messageModel = mongoose.model("messages", Schema)