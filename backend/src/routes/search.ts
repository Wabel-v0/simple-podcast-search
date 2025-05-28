import { FastifyInstance, FastifyPluginOptions } from "fastify";
import axios from "axios";
import prisma from "../utils/prisma";

async function searchRoute(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/", async (request, reply) => {
    const { term } = request.query as { term?: string };
    if (!term) return reply.code(400).send({ error: "Missing search term" });

    try {
      // 1. Check if already exists
      const existing = await prisma.searchResult.findFirst({
        where: { term: term.toLowerCase() }, // normalize
      });

      if (existing) {
        return reply.send(existing); // return existing result
      }

      // 2. If not found, fetch from iTunes
      const res = await axios.get("https://itunes.apple.com/search", {
          params: { term, media: "podcast" },
      });

      // 3. Save new result
      const saved = await prisma.searchResult.create({
        data: {
          term: term.toLowerCase(), // normalize
          results: res.data.results,
        },
      });

      return reply.send(saved);
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Internal server error" });
    }
  });
}

export default searchRoute;
