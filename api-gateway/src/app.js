import express from "express";

import requestRoutes from "./routes/requestRoutes.js";
import logProcessPID from "./middlewares/logProcess.js";

const app = express();

app.use(express.json());

app.use("/api", logProcessPID, requestRoutes);

export default app;
