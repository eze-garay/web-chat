
import CustomRouter from "../custom/custom.routes.js";
import * as cartControllers from "../controller/cartControllers.js"
import { passportCall, authorization} from "../utils.js";

// const urlAddCart = 'user.cartId'
// const codifUrl = encodeURIComponent (urlAddCart)
// `/${codifUrl}0/add/:pid`,



export default class cartExtendRouter extends CustomRouter {

    init() {


        this.post('/:cid/purchase', ["PUBLIC"], cartControllers.purchaseCart)

        this.post('/', ["PUBLIC"], cartControllers.createCart)
        
        this.post('/:cid/add/:pid',["PUBLIC"], passportCall('jwt'), cartControllers.addProductToCart);

        this.post('/eliminar',["PUBLIC"], cartControllers.removeProductFromCart);

        this.get('/carts/:_id', ["PUBLIC"],passportCall('jwt'),authorization('user'), cartControllers.getCartById);

        this.get("*",["PUBLIC"], (req, res) => {
            res.status(404).send("Cannot get that URL!!")
        });
    
    }
}


