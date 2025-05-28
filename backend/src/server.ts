import Fastify from "fastify";
import cors from "@fastify/cors";
import searchRoute from "./routes/search";
import episodesRoute from "./routes/episodes";

const buildServer = async () => {
  const fastify = Fastify({ logger: true });

  await fastify.register(cors, {
    origin: [
      "https://simple-podcast-search.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  });

  fastify.register(searchRoute, { prefix: "/search" });
  fastify.register(episodesRoute);

  return fastify;
};

export default buildServer;
