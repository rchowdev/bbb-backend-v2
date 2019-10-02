const Query = {
    users(parent, args, { prisma }, info) {
        const opArgs = {};

        if(args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
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