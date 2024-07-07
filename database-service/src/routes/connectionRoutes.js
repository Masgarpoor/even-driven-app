import express from "express";

import ConnectionController from "../controllers/connectionController.js";

const router = express.Router();

router
  .route("/:connection_name")
  .get(ConnectionController.existConnection)
  .post(ConnectionController.createConnection)
  .put(ConnectionController.updateConnection)
  .delete(ConnectionController.deleteConnection);

export default router;
