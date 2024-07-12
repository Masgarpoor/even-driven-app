import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import connectionRouter from "./routes/connectionRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/connections", connectionRouter);

mongoose
  .connect(
    `mongodb://mongo:27017/connections_db?replicaSet=rs0`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

export default app;
