import CustomRouter from "../custom/custom.routes.js";
import { passportCall } from "../utils.js";
import * as productControllers from "../controller/productsControllers.js"



export default class productExtendRouter extends CustomRouter {
    init() {
        
       
        this.get('/',["PUBLIC"], passportCall('jwt'), productControllers.getAllProducts);
        
        this.get('/:pid',["PUBLIC"], productControllers.getProduct);

        this.post('/product',["PUBLIC"], productControllers.create);

        this.delete('/:id',["PUBLIC"], productControllers.deleteProduct)

        this.put('/:pid',["PUBLIC"], productControllers.updateProduct);

        this.get("*",["PUBLIC"], (req, res) => {
            res.status(404).send("Cannot get that URL!!")
        });
    
    }
}

// router.get('/', passportCall('jwt'), productControllers.getAllProducts);

// router.get('/:pid', productControllers.getProduct)

// router.post('/product', productControllers.create)

// router.delete('/:id', productControllers.deleteProduct)

// router.put('/:pid', productControllers.updateProduct);

// router.get("*", (req, res) => {
//     res.status(404).send("Cannot get that URL!!")
// });

// export default router;