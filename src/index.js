import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'
import db from './db'

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
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some(user => user.email.toLowerCase() === args.user.email.toLowerCase())
            if(emailTaken){
                throw new Error("Email has already been taken.")
            }

            const user = {
                id: uuidv4(),
                ...args.user
            }

            users.push(user)
            return user
        },
        createBook(parent, args, ctx, info) {
            const user = users.find(user => user.id === args.user)
            if(!user) {
                throw new Error("User not found.")
            }

            let book = books.find(book => book.title === args.title)
            if (book) {
                const userOwnsBook = book.users.some(user => user.id === args.user)
                if(userOwnsBook) {
                    throw new Error("User already owns the book")
                } else {
                    user.books.push(book)
                    book.users.push(args.user)
                }
            } else {
                book = {
                    id: uuidv4(),
                    title: args.title,
                    author: args.author,
                    users: [args.user]
                }
                user.books.push(book)
                books.push(book)
            }
            
            return book
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
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        db 
    }
})

server.start(() => {
    console.log("Server is running")
})