const Query = {
    user(parent, args, { db }, info) {
        return db.users.find(user => user.id === args.id)
    },
    users(parent, args, { db, prisma }, info) {
        // return args.query 
        //     ? db.users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
        //     : db.users
        return prisma.query.users(null, info)
    },
    book(parent, args, { db }, info) {
        return db.books.find(book => book.id === args.id)
    },
    books(parent, args, { db }, info) {
        return db.books
    }
}

export default Query 