import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const password = args.data.password;
        const emailTaken = await prisma.exists.User({ email: args.data.email });

        if (emailTaken) throw new Error("Email has already been taken.");

        if(password.length < 8) {
            throw new Error("Password must be 8 characters or longer.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.mutation.createUser({ 
            data: {
                ...args.data,
                password: hashedPassword
            } 
        });

        return {
            user,
            token: jwt.sign({ userId: user.id} , 'temp_secret')
        }
    },
    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.user({ 
            where: {
                email: args.data.email 
            }
        })

        if(!user) throw new Error("Unable to login");

        const isMatch = await bcrypt.compare(args.data.password, user.password);

        if(!isMatch) {
            throw new Error("Unable to login");
        }
    },
    async createBook(parent, args, { prisma }, info) {
        return prisma.mutation.createBook({ 
            data: {
                title: args.data.title,
                author: args.data.author,
                users: {
                    connect: {
                        id: args.data.user
                    }
                }
            }
        }, info);
    }
}

export default Mutation