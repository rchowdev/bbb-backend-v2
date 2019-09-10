import { Prisma } from 'prisma-binding';

const prisma = new Prisma({ 
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
});

prisma.query.users(null, '{ name email books { id title } }')
    .then(data => console.log(JSON.stringify(data, undefined, 4)));