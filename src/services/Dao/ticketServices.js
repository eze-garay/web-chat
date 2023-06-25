import { Ticket } from "./DB/models/ticketModel.js";

export async function createTicket(totalPrice, purchaser) {
  try {
    const ticket = new Ticket({
      amount: totalPrice,
      purchaser
    });

    await ticket.save();

    return ticket;
  } catch (error) {
    res.status(500).send({error: "No se pudo enviar el ticket usuario", message: error});
  }
}








