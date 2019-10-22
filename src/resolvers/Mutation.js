import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const password = args.data.password;
        const emailTaken = await prisma.exists.User({ email: args.data.email });

        if (emailTaken) throw new Error("Email has already been taken.");

        if(password.length < 8) {
            throw new Error("Password must be 8 characters or longer.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.mutation.createUser({ 
            data: {
                ...args.data,
                password: hashedPassword
            } 
        }, info);

        return {
            user,
            token: jwt.sign({ userId: user.id, 'temp_secret'})
        }
    },
    async createBook(parent, args, { prisma }, info) {
        return prisma.mutation.createBook({ 
            data: {
                title: args.data.title,
                author: args.data.author,
                users: {
                    connect: {
                        id: args.data.user
                    }
                }
            }
        }, info);

        // const user = db.users.find(user => user.id === args.user)
        // if(!user) {
        //     throw new Error("User not found.")
        // }
        
        // let book = db.books.find(book => book.title === args.title)
        // if (book) {
        //     const userOwnsBook = book.users.some(user => user.id === args.user)
        //     if(userOwnsBook) {
        //         throw new Error("User already owns the book")
        //     } else {
        //         user.books.push(book.id)
        //         book.users.push(args.user)
        //     }
        // } else {
        //     book = {
        //         id: uuidv4(),
        //         title: args.title,
        //         author: args.author,
        //         users: [args.user]
        //     }
        //     user.books.push(book.id)
        //     db.books.push(book)
        // }
        
        
        // console.log(user)
        // console.log(book)
        // return book
    }
}

export default Mutation