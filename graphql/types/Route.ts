// /graphql/types/Route.ts
import { objectType, extendType, stringArg, nonNull, intArg } from "nexus";

export const Route = objectType({
  name: "Route",
  definition(t) {
    t.int("route_id");
    t.string("route_name");
    t.string("gpx_link");
    t.int("mountain_id");
  },
});

export const CreateRoute = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createRoute", {
      type: Route,
      args: {
        route_name: nonNull(stringArg()),
        gpx_link: nonNull(stringArg()),
        mountain_id: nonNull(intArg()),
      },
      async resolve(_parent, args, ctx) {
        const newRoute = {
          route_name: args.route_name,
          gpx_link: args.gpx_link,
          mountain_id: args.mountain_id,
        };

        return await ctx.prisma.fjell_over_1000m.update({
          where: {
            email: "viola@prisma.io",
          },
          data: {
            name: "Viola the Magnificent",
          },
        });
      },
    });
  },
});

export const RouteQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("route", {
      type: "Route",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.gpx_route.findMany();
      },
    });
    /*t.nonNull.list.field("routesOnMountain", {
                        args: {
                                mountain_id: nonNull(intArg()),
                        },
                        type: Route,
                        resolve(_parent, args, ctx) {
                                return ctx.prisma.gpx_route.findMany({
                                        where: {
                                                mountain_id: args.mountain_id,
                                        },
                                });
                        },
                });*/
  },
});
