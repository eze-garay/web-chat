
import { Router } from 'express';
import { ProductModel } from '../Dao/DB/models/productsModel.js';
import * as productsServices from "../services/productsServices.js"
//import manager from '../Dao/FileSystem/productManager.js'
const router = Router();





router.get('/', async(req, res,) => {
  let limit = req.query.limit
  if (!limit) {
    limit = "10"
  }
    try {
        let products = []
        let title = req.query.title
        let ordenarPor = req.query.ordenarPor 
        products = await ProductModel.find().limit(parseInt(limit)).lean()
        if (title) {
          products = await ProductModel.aggregate([
            { $match: { title: title } }
          ]).exec();
        }
        if (ordenarPor === 'mayorPrecio') { 
          products = await ProductModel.aggregate([
            { $sort: {price: -1} }
          ]).exec();
        } else if (ordenarPor === 'menorPrecio') { 
          products = await ProductModel.aggregate([
            { $sort: {price: 1} }
          ]).exec();
        }       
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


      router.post('/realtimeproducts/eliminar/:_id', async (req, res) => {
        try {
          const deletedProduct = await ProductModel.findOneAndDelete({_id: req.params._id});
      
          if (!deletedProduct) {
            throw new Error('Producto no encontrado');
          }
          res.redirect('/realtimeproducts');
        } catch (error) {
          console.error(error);
          return false;
        }
      });
     

router.get('/message', async (req, res) =>{
    res.render('message');
})
    
      

  
export default router;