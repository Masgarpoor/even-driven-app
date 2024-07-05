import { Router } from "express";

const router = Router();

router.get('/data', queryController.getData);

export default router;