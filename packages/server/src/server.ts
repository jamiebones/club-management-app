// npm install @apollo/server express graphql cors
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import mongoose from "mongoose";
import express from 'express';
import http from 'http';
import cors from 'cors';

import typeDefs from "./graphql/schema/index.js";
import resolvers from "./graphql/resolvers/index.js";
import 'dotenv/config'

const { USERNAME, PASSWORD, DATABASE_MONGO } = process.env;

interface MyContext {
  token?: string;
}

let PORT = process.env.PORT || 5001;


const startServer = async () => {
  const app = express();
const httpServer = http.createServer(app);
// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);



mongoose
    .connect(`mongodb+srv://${USERNAME}:${PASSWORD}@ssc1980-cluster.xe0syn3.mongodb.net/${DATABASE_MONGO}?retryWrites=true&w=majority`
     )
    .then(() => console.log("Connected to db"))
    .catch((err: { err: any; message: any }) => console.log(err.message));

// Modified server startup
httpServer.listen(PORT, () => {
  console.log(`apolloServer is ready at http://localhost:${PORT}/graphql`);
});
// await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
// console.log(`🚀 Server ready at http://localhost:4000/`);
}


  startServer();

