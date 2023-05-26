import { Router } from "express";
import { passportCall } from "../utils.js";
import * as productControllers from "../controller/productsControllers.js"

const router = Router();

router.get('/', passportCall('jwt'), productControllers.getAllProducts);

router.get('/:pid', productControllers.getProduct)

router.post('/product', productControllers.create)

router.delete('/:id', productControllers.deleteProduct)

router.put('/:pid', productControllers.updateProduct);

router.get("*", (req, res) => {
    res.status(404).send("Cannot get that URL!!")
});

export default router;