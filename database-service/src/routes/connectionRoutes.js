import express from "express";

import ConnectionController from "../controllers/connectionController.js";
import logProcessPID from "../middlewares/logProcess.js";

const router = express.Router();

router
  .route("/:connection_name")
  .get(logProcessPID, ConnectionController.existConnection)
  .post(logProcessPID, ConnectionController.createConnection)
  .put(logProcessPID, ConnectionController.updateConnection)
  .delete(logProcessPID, ConnectionController.deleteConnection);

export default router;
