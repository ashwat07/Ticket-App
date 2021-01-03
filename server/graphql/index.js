import TicketResolver from './resolver';

export default {
	Query: {
      getTicket: TicketResolver.getTicket,
      getTickets: TicketResolver.getTickets
	},

	Mutation: {
      createTicket: TicketResolver.createTicket
	}
}