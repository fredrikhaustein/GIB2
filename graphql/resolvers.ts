// /graphql/resolvers.ts
export const resolvers = {
        Query: {
                mountainse: (_parent, _args, ctx) => {
                        return ctx.prisma.mountain.findMany();
                },
        },
};
