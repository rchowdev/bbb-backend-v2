import uuidv4 from 'uuid/v4'

const Mutation = {
    createUser(parent, args, { db }, info) {
        const emailTaken = db.users.some(user => user.email.toLowerCase() === args.user.email.toLowerCase())
        if(emailTaken){
            throw new Error("Email has already been taken.")
        }

        const user = {
            id: uuidv4(),
            ...args.user,
            books: []
        }

        db.users.push(user)
        return user
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