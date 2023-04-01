import { Router } from "express";
const router = Router();
// import { uploader } from "../utils.js";
import manager from '../service/productManager.js'
import validateProduct from "../middlewares/validar.js";

router.get('/', async (req,res)=> {
    let limit = req.query?.limit
    try {
        let prod = await manager.getProduct(limit)
        if (!prod) {
            return res.status(404).send({error: 'no funciona'})
            
        }  if (limit) {
            const limitacion = prod.splice(0,limit);
            return res.status(200).send(limitacion)
        } else {
          return res.status(200).send(prod)
        }

        
    } catch (error) {
        return res.status(500).send(error.message)
    }

})


router.get('/:pid', async (req,res)=>{
    let pid = req.params.pid
    
    try {
        let one = await manager.getProductById(Number(pid))
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



router.post('/product',validateProduct, async (req,res)=> {
    let product = req.body
    try {
        let prod = await manager.addProduct((product))
        if (prod) {
            return res.status(200).send(prod)
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

router.delete('/:id', async (req,res)=>{
    let id = req.params.id
    try {
        let one = await manager.deleteProduct(Number(id))
        return res.status(one.status).send(one.response)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})
router.put('/:pid', async (req,res)=> {
    let pid = req.params.pid
    
    try {
        let productUpdated =  await manager.updateProductById(Number(pid),req.body)
        if (productUpdated) {
            return res.status(200).send({message: "Producto Modificado"})
        } else {
            return res.status(500).send({error: "El producto no se pudo modificar"})
        }    
    } catch (error) {
        return res.status(500).send(error.message)
    }

})

export default router