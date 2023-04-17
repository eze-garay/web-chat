import { Router } from "express";
const router = Router();
import * as messageController from "../controller/messageController.js"

router.get('/recent', messageController.handleGetRecentMessages);
router.post('/', messageController.handleSaveMessage);

export default router