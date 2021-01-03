export default `
  type ticket {
  	_id: ID!
  	name: String!
  	EmpID: ID!
  	comment: String!
    ticketID: ID
  }

  type Query {
  	getTicket(_id: ID!): ticket
    getTickets: [ticket]
  }

  type Mutation {
  	createTicket(name: String!, EmpID: ID!, comment: String!): ticket
  }

  schema {
  	query: Query
  	mutation: Mutation
  }

`