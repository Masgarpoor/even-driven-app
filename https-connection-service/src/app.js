import express from "express";
import dataRoutes from "./routes/dataRoutes.js";

const app = express()

app.use(express.json())

app.use('/api', dataRoutes)

export default app;