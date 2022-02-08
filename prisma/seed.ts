// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import { links } from "../data/links";
const prisma = new PrismaClient();

async function main() {
        await prisma.user.create({
                data: {
                        email: `siguskat@stud.ntnu.no`,
                        role: "USER",
                },
        });

        await prisma.link.createMany({
                data: links,
        });
}

main()
        .catch((e) => {
                console.error(e);
                process.exit(1);
        })
        .finally(async () => {
                await prisma.$disconnect();
        });
