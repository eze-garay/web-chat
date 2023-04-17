
import { Router } from 'express';
import manager from '../Dao/FileSystem/productManager.js'
const router = Router();





router.get('/', async(req, res,) => {
    let limit = req.query?.limit
    try {
        let response = await manager.getProduct(limit)
        if (!response) {
            return res.status(404).render('error',{
                message: 'no hay profuctos'
            })
        }
        return res.status(200).render('home', {
            title: "lista de productos",
            manager: response
        })
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

 router.get('/realtimeproducts', async (req, res) => {
        let response = await manager.getProduct() 
        if (!response) {
            return res.status(404).render('error',{
                message: 'no products yet'
            })
        }
        return res.status(200).render('realTimeProducts', {
            title: "Productos en tiempo real",
            manager: response})
      })
      
    
 router.post('/realtimeproducts/crear', async (req, res) => {
        let product = req.body
      
        // Agregar el nuevo producto a la lista
        product = await manager.addProduct((product))

        // Redirigir de vuelta a la vista de productos en tiempo real
        res.redirect('/realtimeproducts');
      })


 router.post('/realtimeproducts/eliminar/:id', async (req, res) => {
        let id = req.params.id
        try {
            let one = await manager.deleteProduct(Number(id))
            if (one) {
                res.redirect('/realtimeproducts');   
            }
        } catch (error) {
            return res.status(500).render('error',{
                message: error.message
            })
        }      
      })

router.get('/message', async (req, res) =>{
    res.render('message');
})
    
      

  
export default router;