const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

// Run the server on a port specified in our .env file or port
const port = process.env.PORT || 4000;

// In memory data representation
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

// Construct a schema, usinf GraphQl schema language
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String!
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
    hello: () => "Hello World! GraphQL is awesome!",
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    },
  },

  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length +1),
        content: args.content,
        author: "Caylem Harris"
      };
      notes.push(noteValue);
      return noteValue;
    }
  }
};

const app = express();

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
