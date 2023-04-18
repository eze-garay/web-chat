import { Router } from "express";
const router = Router();
import * as productsControllers from "../Dao/controller/productsControllers.js"

router.get("/", productsControllers.getAll)

router.get('/:pid', productsControllers.getProduct)

router.post('/product', productsControllers.create)

router.delete('/:id', productsControllers.deleteProduct)

router.put('/:pid', productsControllers.modify)

export default router