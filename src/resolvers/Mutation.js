import uuidv4 from 'uuid/v4'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const emailTaken = await prisma.exists.User({ email: args.data.email });

        if (emailTaken) throw new Error("Email has already been taken.");
        
       return prisma.mutation.createUser({ data: args.data }, info)
    },
    createBook(parent, args, { db }, info) {
        const user = db.users.find(user => user.id === args.user)
        if(!user) {
            throw new Error("User not found.")
        }
        
        let book = db.books.find(book => book.title === args.title)
        if (book) {
            const userOwnsBook = book.users.some(user => user.id === args.user)
            if(userOwnsBook) {
                throw new Error("User already owns the book")
            } else {
                user.books.push(book.id)
                book.users.push(args.user)
            }
        } else {
            book = {
                id: uuidv4(),
                title: args.title,
                author: args.author,
                users: [args.user]
            }
            user.books.push(book.id)
            db.books.push(book)
        }
        
        
        console.log(user)
        console.log(book)
        return book
    }
}

export default Mutation