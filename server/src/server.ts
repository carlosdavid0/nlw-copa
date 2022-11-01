import Fastify from "fastify";
import cors from "@fastify/cors";

import { PrismaClient } from "@prisma/client";

const prima = new PrismaClient({
  log: ["query"],
});

async function bootstap() {
  const fastify = Fastify({ logger: true });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get("/pools/count", async () => {
    const pool = await prima.pool.count();
    return { count: pool };
  });

  await fastify.listen({ port: 3333, host: "0.0.0.0" });
}

bootstap();
