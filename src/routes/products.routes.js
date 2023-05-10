import { Router } from "express";
const router = Router();
import * as productsControllers from "../controller/productsControllers.js"



router.get("/", productsControllers.getAll)

router.get('/:pid', productsControllers.getProduct)

router.post('/product', productsControllers.create)

router.delete('/:id', productsControllers.deleteProduct)

router.put('/:pid', productsControllers.modify)

router.get("*", (req, res) => {
    res.status(404).send("Cannot get that URL!!")
});


  

export default router 