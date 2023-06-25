import { Router } from "express";
import { fakeUser } from "../controller/userControllers.js";

const router = Router();

router.get("/test", fakeUser);

export default router;