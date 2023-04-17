
import { Router } from 'express';
import { ProductModel } from '../Dao/DB/models/productsModel.js';
import manager from '../Dao/FileSystem/productManager.js'
const router = Router();





router.get('/', async(req, res,) => {
    try {
        let products = []
        products = await ProductModel.find().lean()
        res.render("home", {products})
      } catch (error) {
        console.log(error)
        res.render("home", "NO SE PUDIERON OBTENER LOS PRODUCTOS")
      }
})

 router.get('/realtimeproducts', async (req, res) => {
    try {
        let products = []
        products = await ProductModel.find().lean()
        res.render("realTimeProducts", {products} )
      } catch (error) {
        console.log(error)
        res.render("realTimeProducts", "NO SE PUDIERON OBTENER LOS PRODUCTOS")
      }

    })
    
    router.get("/chat", (req, res) => {
      res.render("chat")
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
          const product = await ProductModel.findById(id);
          if (!product) {
            throw new Error('Producto no encontrado');
          }
          await product.remove();
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      })
     

router.get('/message', async (req, res) =>{
    res.render('message');
})
    
      

  
export default router;