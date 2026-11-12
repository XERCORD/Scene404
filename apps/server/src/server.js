import "dotenv/config";
import app from "./app.js";
import { prisma } from "./config/db.js";

const port = Number(process.env.PORT ?? 5000);

await prisma.$connect();

const server = app.listen(port, () => {
  console.log(`Scene404 API listening on port ${port}`);
});

let isShuttingDown = false;

const shutdown = () => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  server.close(async (error) => {
    if (error) {
      console.error("Failed to close the HTTP server:", error);
      process.exitCode = 1;
    }

    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error("Failed to disconnect from PostgreSQL:", disconnectError);
      process.exitCode = 1;
    }
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
