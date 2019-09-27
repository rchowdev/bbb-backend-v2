const Query = {
    // user(parent, args, { prisma }, info) {
    //     return prisma.query.user(null, info)
    // },
    users(parent, args, { prisma }, info) {
        // return args.query 
        //     ? db.users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
        //     : db.users

        const opArgs = {};

        if(args.query) {
            opArgs.where = {
                name_contains: args.query
            }
        }

        return prisma.query.users(opArgs, info)
    },
    book(parent, args, { prisma }, info) {
        return prisma.query.book(null, info)
    },
    books(parent, args, { prisma }, info) {
        return prisma.query.books(null, info)
    }
}

export default Query 