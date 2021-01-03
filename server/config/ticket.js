import mongoose, { Schema } from 'mongoose';

const TicketSchema = new Schema({
    ticketID: {
        type: Number
    },

	name: {
		type: String,
		required: true
	},
	EmpID: {
		type: Number,
		required: true
	},
	comment: {
		type: String,
		minlength: [5, 'Texts need to be longer']
	}
})

module.exports = mongoose.model('Ticket', TicketSchema);