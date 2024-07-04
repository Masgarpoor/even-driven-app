import express from "express";

import ConnectionController from "../controllers/connectionController.js";

const router = express.Router();

router.post("/connections", ConnectionController.createConnection);
router.put("/connections/:id", ConnectionController.updateConnection);
router.delete("/connections/:id", ConnectionController.deleteConnection);

export default router;
