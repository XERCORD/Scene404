<<<<<<< HEAD
=======
import cors from "cors";
import express from "express";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL ?? "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

export default app;
>>>>>>> 68998b64db95072f638f91b546c05d2e41f054fe
