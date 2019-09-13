import { Prisma } from 'prisma-binding';

const prisma = new Prisma({ 
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
});

// prisma.query.users(null, '{ name email books { id title } }')
//     .then(data => console.log(JSON.stringify(data, undefined, 4)));

// prisma.mutation.createBook({
//     data: {
//         title: "Test Book",
//         author: "Test Author",
//         users: {
//             connect: {
//                 id: "cjzxsgbdj00f3077198sss8s4"
//             }
//         }
//     }
// }, '{ id title users { email } }').then(data => {
//     console.log(JSON.stringify(data, undefined, 4))
// })

// const createBookForUser = async (userId, data) => {
//     const book = await prisma.mutation.upsertBook({
//         where: {
//             isbn: data.isbn
//         },
//         create: {
//             ...data,
//             users: {
//                 connect: {
//                     id: userId
//                 }
//             }
//         },
//         update: {
//             users: {
//                 connect: {
//                     id: userId
//                 }
//             }
//         }
//     }, '{ id title users { name } }')

//     return book
// }