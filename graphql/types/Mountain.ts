// /graphql/types/Mountain.ts
import { objectType, extendType, nonNull, intArg, stringArg } from "nexus";

export const Mountain = objectType({
  name: "Mountain",
  definition(t) {
    t.int("ogc_fid");
    t.string("navn");
    t.float("lat");
    t.float("lon");
    t.int("h_yde");
    t.list.int("wkb_geometry");
    t.list.string("route_urls");
  },
});
export const MountainsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("mountains", {
      type: "Mountain",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.fjell_over_1000m.findMany();
      },
    });
  },
});

export const RouteLinkAdd = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("routeAdd", {
      type: "Mountain",
      args: {
        gpx_link: nonNull(stringArg()), // 2
        mountain_id: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.fjell_over_1000m.update({
          where: {
            ogc_fid: args.mountain_id,
          },
          data: {
            route_urls: {
              push: args.gpx_link,
            },
          },
        });
      },
    });
  },
});
