import express from "express";

import ConnectionController from "../controllers/connectionController.js";

const router = express.Router();

router.post("/connections", ConnectionController.createConnection);

export default router;
