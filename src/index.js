import { GraphQLServer } from 'graphql-yoga'

//Dummy data
const users = [{
    id: "1",
    name: "John",
    email: "john@demo.com"
}, {
    id: "2",
    name: "Jane",
    email: "jane@demo.com"
}]

//Type Definitions
const typeDefs = `
    type Query {
        users(query: String): [User!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
    }
`

//Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            return args.query 
                ? users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
                : users
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("Server is running");
})