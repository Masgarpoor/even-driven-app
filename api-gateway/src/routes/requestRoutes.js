import { Router } from "express";

import requestController from "../controllers/requestController.js";
import checkConnectionExists from "../middlewares/checkConnectionExists.js";

const router = Router();

router.all('/connections/:connection_name', requestController.connectionsRequest)
router.post('/:connection_name/data',checkConnectionExists, requestController.dataRequest)
router.get('/:connection_name/data', checkConnectionExists, requestController.queryRequest)
export default router;