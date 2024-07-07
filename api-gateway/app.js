import express from "express";

import requestRoutes from "./src/routes/requestRoutes.js";

const app = express();

app.use(express.json());

app.use("/api", requestRoutes);


export default app;
