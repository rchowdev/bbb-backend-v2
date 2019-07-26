const Book = {
    users(parent, args, { db }, info) {
        return db.users.filter(user => user.books.includes(parent.id))
    }
}

export default Book