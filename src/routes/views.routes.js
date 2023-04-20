
import { Router } from 'express';
import { ProductModel } from '../Dao/DB/models/productsModel.js';
//import manager from '../Dao/FileSystem/productManager.js'
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
        res.render("realTimeProducts", {
          products,
          title: "Lista de productos actuales",
        } );
      } catch (error) {
        console.log(error)
        res.render("realTimeProducts", "NO SE PUDIERON OBTENER LOS PRODUCTOS")
      }

    })
    
 
    
      
    
 router.post('/realtimeproducts/crear', async (req, res) => {
        let product = req.body
      
        // Agregar el nuevo producto a la lista
        product = await ProductModel.create((product))

        // Redirigir de vuelta a la vista de productos en tiempo real
        res.redirect('/realtimeproducts');
      })


 router.post('/realtimeproducts/eliminar/:id', async (req, res) => {
        try {
          const productFind = await ProductModel.findById({_id: req.params.pid});
          console.log(productFind)
           if (!productFind) {
            throw new Error('Producto no encontrado');
           }
           await product.deleteOne(productFind);
    
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