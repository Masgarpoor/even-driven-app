import { Router } from "express";

import QueryController from "../controllers/queryController.js";

const router = Router();

router.get('/data', QueryController.getData);

export default router;