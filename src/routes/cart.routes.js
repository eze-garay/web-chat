
import CustomRouter from "../custom/custom.routes.js";
import * as cartControllers from "../controller/cartControllers.js"
import { passportCall } from "../utils.js";



export default class cartExtendRouter extends CustomRouter {

    init() {

        
        this.post('/',["PUBLIC"], cartControllers.createCart)
        
        this.get('/:cid',["PUBLIC"], cartControllers.getCart);

        this.post('/:cid/add/:pid',["PUBLIC"], passportCall('jwt'), cartControllers.addProductToCart);

        this.post('/eliminar',["PUBLIC"], cartControllers.removeProductFromCart);

        this.get('/carts/:_id', ["PUBLIC"], cartControllers.getCartById);

        this.get("*",["PUBLIC"], (req, res) => {
            res.status(404).send("Cannot get that URL!!")
        });
    
    }
}


// router.post('/', cartControllers.createCart);

// router.get('/:cid', cartControllers.getCart); 

// router.post('/:cid/add/:pid', cartControllers.addProductToCart);

// router.post('/eliminar', cartControllers.removeProductFromCart);

// router.get('/carts/:_id', cartControllers.getCartById);

// router.get("*", (req, res) => {
//     res.status(404).send("Cannot get that URL!!")
// });


// export default router