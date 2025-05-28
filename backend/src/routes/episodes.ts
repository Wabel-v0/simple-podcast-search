import { FastifyInstance } from "fastify";
import axios from "axios";
import prisma from "../utils/prisma";

export default async function episodesRoute(fastify: FastifyInstance) {
  fastify.get("/episodes", async (req, reply) => {
    const ids = (req.query as any).ids;
    if (!ids) return reply.code(400).send({ error: "Missing ids param" });

    const idList: string[] = ids.split(",");

    try {
      const apiCalls = idList.map((id: string) =>
        axios
          .get("https://itunes.apple.com/lookup", {
            params: { id, entity: "podcastEpisode", limit: 10 },
            timeout: 5000,
          })
          .catch((error) => {
            console.error(
              `Error fetching episodes for ID ${id}:`,
              error.message
            );
            return null;
          })
      );

      const responses = await Promise.all(apiCalls);
      const results: any[] = [];
      const episodesToSave: any[] = [];

      // Process all responses
      for (let i = 0; i < responses.length; i++) {
        const res = responses[i];
        const id = idList[i];

        if (!res || !res.data.results || res.data.results.length === 0) {
          continue;
        }

        const show = res.data.results.find(
          (item: any) => item.kind === "podcast"
        );
        const episodes = res.data.results.filter(
          (item: any) => item.kind === "podcast-episode"
        );

        if (show) {
          const episodeData = episodes.map((e: any) => ({
            trackId: e.trackId,
            trackName: e.trackName,
            podcastTitle: show.collectionName || show.trackName,
            artworkUrl: show.artworkUrl100,
            releaseDate: e.releaseDate,
            previewUrl: e.previewUrl,
            description: e.shortDescription || e.description,
            duration: e.trackTimeMillis,
          }));

          episodesToSave.push(...episodeData);

          results.push({
            podcastTitle: show.collectionName || show.trackName,
            artworkUrl: show.artworkUrl100,
            episodes: episodeData,
          });
        }
      }

      // Batch save episodes to database (async, don't wait for it)
      if (episodesToSave.length > 0) {
        setImmediate(async () => {
          try {
            for (const episode of episodesToSave) {
              await prisma.episode.upsert({
                where: { trackId: episode.trackId },
                update: episode,
                create: episode,
              });
            }
          } catch (error) {
            console.error("Error saving episodes to database:", error);
          }
        });
      }

      return results;
    } catch (error) {
      console.error("Error in episodes endpoint:", error);
      return reply.code(500).send({ error: "Failed to fetch episodes" });
    }
  });
}
