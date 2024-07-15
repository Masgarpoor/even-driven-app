import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import connectionRouter from "./routes/connectionRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/connections", connectionRouter);

mongoose
  .connect(
    `mongodb://localhost:2717,localhost:2727,localhost:2737/connections_db?replicaSet=rs0`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

export default app;
