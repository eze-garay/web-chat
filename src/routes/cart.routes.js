import { Router } from "express";
const router = Router();
import carts from '../service/carritoManager.js'



router.post('/', async (req,res)=> {
    
    try {
        let prod = await carts.addCart()
        if (prod) {
            return res.json({
                message: 'Carrito creado con éxito',
              });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

router.get('/:cid', async (req,res)=>{
    let pid = req.params.cid
    
    try {
        let one = await carts.getCartById(Number(pid))
        //const found = await manager.product.filter(e => e.id === pid)
        
        if (one) {

            //return res.status(200).send(found)
            return res.status(200).send(one)

        } else {
            return res.status(404).send({error: 'Producto no econtrado'})
        }
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
} )

router.post('/:cid/add/:pid', async(req,res,) => {
    let cid = parseInt(req.params.cid)
    let pid = parseInt(req.params.pid)

    try {
        let cart = await carts.addProductToCart(Number(cid),Number(pid))
        if (!cart) {
            return res.status(404).send('no se puede encontrar el carrito')
        }
        return res.status(200).send(cart)
    } catch(error) {
        return res.status(500).send(error.message)
    }
})





export default router