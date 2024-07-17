import { Router } from "express";

import validateQuery from "../middlewares/validateQuery.js";
import QueryController from "../controllers/queryController.js";

const router = Router();

router.get("/:connection_name/data", validateQuery, QueryController.getData);
router.delete("/:connection_name/data", QueryController.deleteDatas);

export default router;
