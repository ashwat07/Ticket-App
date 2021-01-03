import mongoose, { Schema } from 'mongoose';
import Ticket from './ticket';

const CounterSchema = new Schema({
    _id: {
    	type: Number,
    	enum: [Ticket.ticketID]
    },
    sequence_val: 0
});

module.exports = mongoose.model('Counter', CounterSchema);