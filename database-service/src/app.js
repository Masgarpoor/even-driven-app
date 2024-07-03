import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import connectionRouter from "./routes/connectionRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/host", connectionRouter);

mongoose
  .connect("mongodb://localhost:27017/connections_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

export default app;
