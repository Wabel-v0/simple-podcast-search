import buildServer from "./server";

const start = async () => {
  const fastify = await buildServer();
  const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

  try {
    await fastify.listen({ port, host: "0.0.0.0" });
    console.log(`Server running at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
