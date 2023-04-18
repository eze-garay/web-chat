import { Router } from "express";
import * as UserController from "../Dao/controller/userControllers.js"


const router = Router();

router.get("/", UserController.getAll);

router.post('/',UserController.creatUser);

router.get('/:id', UserController.infoUser);

export default router

