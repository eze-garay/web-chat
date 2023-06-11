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
    // Manejar el error adecuadamente
    console.error('Error al crear el ticket:', error);
    throw error; // O manejarlo de otra manera según tus necesidades
  }
}








