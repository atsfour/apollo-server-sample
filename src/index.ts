import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";

const typeDefs = loadSchemaSync("./schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});

interface Person {
  id: string;
  name: string;
}

const persons = [
  { id: "person1", name: "Alice" },
  { id: "person2", name: "Bob" },
  { id: "person3", name: "Charlie" },
  { id: "person4", name: "Dave" },
];

const friendships = [
  { personId: "person1", friendId: "person2" },
  { personId: "person1", friendId: "person3" },
  { personId: "person2", friendId: "person1" },
  { personId: "person3", friendId: "person1" },
];

const resolvePersons = (name?: string) => {
  return persons
  .filter((p) => name ? p.name.match(name) : true)
}

const resolveFriends = (person: Person) => {
  console.log(`Resolving friends for ${person.id}`)
  return friendships
  .filter((fs) => fs.personId === person.id)
  .map((fs) => persons.find(p => p.id === fs.friendId))
}


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    persons: (_, {name}) => resolvePersons(name),
  },
  Person: {
    friends: (parent: Person) => resolveFriends(parent)
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
