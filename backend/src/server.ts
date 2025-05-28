import Fastify from "fastify";
import cors from "@fastify/cors";
import searchRoute from "./routes/search";
import episodesRoute from "./routes/episodes";

const buildServer = () => {
  const fastify = Fastify({ logger: true });

  // Register CORS to allow frontend connections
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:3000", "http://localhost:3001"];

  fastify.register(cors, {
    origin: allowedOrigins,
    credentials: true,
  });

  fastify.register(searchRoute, { prefix: "/search" });
  fastify.register(episodesRoute);
  return fastify;
};

export default buildServer;
