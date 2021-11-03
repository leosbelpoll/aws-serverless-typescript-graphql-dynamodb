import {ApolloServer, gql} from 'apollo-server-lambda';
import People from 'src/models/People';


const typeDefs = gql`
  type Query {
    getUsers: [User]
  }

  type User {
    id: String
    name: String
    age: Int
  }

  type Mutation {
    createUser(name: String, age: Int): User
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => await People.scan().exec()
  },
  Mutation: {
    createUser: async (_: any, params: {name: string, age: number}) => {
      const {name, age} = params
      const newPerson = new People({
        id: new Date().getTime().toString(),
        name,
        age
      })
      const data = await newPerson.save();
      return data;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


export const main = server.createHandler()
