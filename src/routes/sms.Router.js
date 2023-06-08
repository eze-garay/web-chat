import { Router } from "express";
import {sendSMS} from "../controller/smsControllers.js"

const router = Router();

router.get("/", sendSMS);

export default router;