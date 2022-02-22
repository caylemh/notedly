const express = require("express");
const {
  ApolloServer,
  gql
} = require("apollo-server-express");
require('dotenv').config();

// Import my models
const models = require("./models");

// Import the DB
const db = require("./db");

// Run the server on a port specified in our .env file or port
const port = process.env.PORT || 4000;

// DB variable definition
const DB_HOST = process.env.DB_HOST;

/* In memory data representation
let notes = [{
    id: "1",
    content: "This is a note.",
    author: "Caylem Harris"
  },
  {
    id: "2",
    content: "This is another note.",
    author: "Adam Scott"
  },
  {
    id: "3",
    content: "Oh hey look, another note!",
    author: "Harlow Everly"
  }
];
*/

// Construct a schema, usinf GraphQl schema language
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String
    notes: [Note!]!
    note(id: ID!): Note!
  }

  type Mutation {
    newNote(content: String!): Note!
  }
`;

// Provide resolver functions for our schema fields
const resolvers = {
  Query: {
    hello: () => "GraphQL is awesome!!!",
    notes: async () => {
      return await models.Note.find();
    },
    note: async (parent, args) => {
      return await models.Note.findById(args.id);
    },
  },

  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: "Caylem Harris"
      });
    }
  }
};

const app = express();

// Connect to the database
db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({
  app,
  path: "/api"
});

app.get("/", (req, res) => res.send("Hello World, Javascript is awesome!!!"));

app.listen({
    port
  }, () =>
  console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`)
);
