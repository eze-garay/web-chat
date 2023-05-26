import { Router } from "express";
const router = Router();
import * as cartControllers from "../controller/cartControllers.js"



router.post('/', cartControllers.createCart);

router.get('/:cid', cartControllers.getCart); 

router.post('/:cid/add/:pid', cartControllers.addProductToCart);

router.post('/eliminar', cartControllers.removeProductFromCart);

router.get('/carts/:_id', cartControllers.getCartById);


export default router