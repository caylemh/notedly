const express = require("express");
const { ApolloServer } = require("apollo-server-express");
require('dotenv').config();

// Local Module imports
const resolvers = require("./resolvers")
const models = require("./models");
const db = require("./db");
const typeDefs = require("./schema");

// Run the server on a port specified in our .env file or port
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();

// Connect to the database
db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    // Add the db models to the context
    return { models };
  }
});

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: "/api" });

app.listen({
    port
  }, () =>
  console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`)
);
