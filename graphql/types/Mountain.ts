// /graphql/types/Mountain.ts
import { objectType, extendType } from "nexus";

export const Mountain = objectType({
        name: "Mountain",
        definition(t) {
                t.string("ogc_fid");
                t.string("navn");
                t.float("lat");
                t.float("lon");
                t.int("h_yde");
                t.list.int("wkb_geometry");
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
