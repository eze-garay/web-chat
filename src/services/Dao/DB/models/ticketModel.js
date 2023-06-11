import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  code: { type: String, default: mongoose.Types.ObjectId },
  purchase_datetime: { type: Date, default: Date.now },
  amount: Number,
  purchaser: String
});

export const Ticket = mongoose.model('Ticket', ticketSchema);
