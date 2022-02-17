// /graphql/resolvers.ts
export const resolvers = {
        Query: {
                mountains: (_parent, _args, ctx) => {
                        return ctx.prisma.mountain.findMany();
                },
        },
};
