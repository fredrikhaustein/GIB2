// /graphql/types/Mountain.ts
import { objectType, extendType } from "nexus";

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

export const RoutesOnMountain = extendType({
        type: "Query",
        definition(t) {
                t.nonNull.list.field("routes", {
                        type: "Route",
                        resolve(_parent, _args, ctx) {
                                return ctx.prisma.gpx_route.findMany({
                                        where: {
                                                mountain_id: args.mountain_di
                                        }
                                });
                        },
                });
        },
});
