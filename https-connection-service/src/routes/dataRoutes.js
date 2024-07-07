import { Router } from "express";

import validateDataFormat from "../middlewares/validateDataFormat.js";
import dataController from "../controllers/dataController.js";

const router = Router();

router.post(
  "/:connection_name/data",
  validateDataFormat,
  dataController.receiveData
);

export default router;
