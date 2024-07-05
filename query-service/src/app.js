import "dotenv/config";
import express from "express";

import queryRoutes from "./routes/queryRoutes.js";

const app = express();

app.use(express.json());

app.use('/api', queryRoutes)

export default app;
