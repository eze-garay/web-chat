import { Router } from "express";
const router = Router();
import * as cartControllers from "../controller/cartControllers.js"



router.post('/', cartControllers.create)

router.get('/:cid', cartControllers.getCart)

router.post('/:cid/add/:pid', cartControllers.addProduct)

router.get("*", (req, res) => {
    res.status(404).send("Cannot get that URL!!")
});


  


export default router