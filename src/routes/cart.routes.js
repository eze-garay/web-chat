import { Router } from "express";
const router = Router();
import * as cartControllers from "../controller/cartControllers.js"



router.post('/', cartControllers.create)

router.get('/:cid', cartControllers.getCart)

router.post('/:cid/add/:pid', cartControllers.addProduct)


export default router