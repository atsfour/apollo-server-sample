import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { PersonRepository } from "./repository/person.js";
import { Resolvers } from "./generated/graphql.js";

const typeDefs = loadSchemaSync("./schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});

interface ContextValue {
  dataSources: {
    personRepository: PersonRepository;
  };
}

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers: Resolvers = {
  Query: {
    persons: (_, {name}, {dataSources}) => dataSources.personRepository.findAll(name),
  },
  Person: {
    friends: (parent, _, {dataSources}) => dataSources.personRepository.findFriendsByPerson(parent),
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    return {
      dataSources: {
        personRepository: new PersonRepository(),
      }
    }
  }
});

console.log(`🚀  Server ready at: ${url}`);
