import { GraphQLServer } from 'graphql-yoga'

//Dummy data
const users = [{
    id: "1",
    name: "John",
    email: "john@demo.com",
    books: ["1", "2"]
}, {
    id: "2",
    name: "Jane",
    email: "jane@demo.com",
    books: ["1"]
}]

const books = [{
    id: "1",
    title: "Harry Potter",
    author: "J.K. Rowling",
    users: ["1", "2"]
}, {
    id: "2",
    title: "A Story of Fire and Ice",
    author: "George R.R. Martin",
    users: ["1"]
}]

//Type Definitions
const typeDefs = `
    type Query {
        user(id: ID!): User!
        users(query: String): [User!]!
        book(id: ID!): Book!
        books: [Book!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        books: [Book!]!
    }

    type Book {
        id: ID!
        title: String!
        author: String!
        users: [User!]!
    }
`

//Resolvers
const resolvers = {
    Query: {
        user(parent, args, ctx, info) {
            return users.find(user => user.id === args.id)
        },
        users(parent, args, ctx, info) {
            return args.query 
                ? users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
                : users
        },
        book(parent, args, ctx, info) {
            return books.find(book => book.id === args.id)
        },
        books(parent, args, ctx, info) {
            return books
        }
    },
    User: {
        books(parent, args, ctx, info) {
            return books.filter(book => book.users.includes(parent.id))
        }
    },
    Book: {
        users(parent, args, ctx, info) {
            return users.filter(user => user.books.includes(parent.id))
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("Server is running")
})