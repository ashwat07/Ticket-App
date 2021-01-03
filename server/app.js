import express from 'express';
import './config/db';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './graphql/schema';
import resolvers from './graphql';


const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: "/graphql"
    })
);


app.use(
    '/graphql',
    graphqlExpress(req => ({
      schema
    })),
);

const httpServer = createServer(app);

httpServer.listen(3001, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`App listen to port 3001`);
    }
});

