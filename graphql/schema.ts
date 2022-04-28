// graphql/schema.ts
import { makeSchema } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import { join } from "path";
import * as types from "./types";

export const schema = makeSchema({
        types,
        plugins: [nexusPrisma()],
        outputs: {
                typegen: join(
                        process.cwd(),
                        "node_modules",
                        "@types",
                        "nexus-typegen",
                        "index.d.ts"
                ),
                schema: join(process.cwd(), "graphql", "schema.graphql"),
        },
        contextType: {
                export: "Context",
                module: join(process.cwd(), "graphql", "context.ts"),
        },
});
