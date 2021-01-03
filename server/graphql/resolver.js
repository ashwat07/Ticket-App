import Ticket from "../config/ticket";
import Counter from "../config/counter";
// import getNextSequenceValue from './getSequence';

export default {
  getTicket: async (_, { _id }) => {
    try {
      const get_ticket = await Ticket.findById(_id);
      return get_ticket;
    } catch (e) {
      throw e;
    }
  },

  getTickets: async (_, args) => {
    try {
      const get_tickets = await Ticket.find({});
      return get_tickets;
    } catch (e) {
      throw e;
    }
  },

  createTicket: async (_, { name, EmpID, comment }) => {
    let ticketID = (await Ticket.find().count()) + 1;
    const create_ticket = await Ticket.create({
      name,
      EmpID,
      comment,
      ticketID,
    });
    return create_ticket;
  },
};
