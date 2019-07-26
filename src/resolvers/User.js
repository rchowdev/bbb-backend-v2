const User = {
    books(parent, args, { db }, info) {
        return db.books.filter(book => book.users.includes(parent.id))
    }
}

export default User