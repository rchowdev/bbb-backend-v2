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

const db = { 
    users,
    books
}

export default db