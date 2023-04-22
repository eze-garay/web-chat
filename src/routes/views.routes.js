
import { Router } from 'express';
import { ProductModel } from '../Dao/DB/models/productsModel.js';
import { CartsModel } from '../Dao/DB/models/cartsModel.js';
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
        let page = parseInt(req.query.page);
        if(!page) page=1;
        let result = await ProductModel.paginate({},{page,limit:10,lean:true})
        result.prevLink = result.hasPrevPage?`http://localhost:8080/?page=${result.prevPage}`:'';
        result.nextLink = result.hasNextPage?`http://localhost:8080/?page=${result.nextPage}`:'';
        result.isValid= !(page<=0||page>result.totalPages) 

        let ordenarPor = req.query.ordenarPor 
        if (title) {
          products = await ProductModel.aggregate([
            { $match: { title: title } }
          ]).exec();
        } else {
          products = await ProductModel.find().limit(parseInt(limit)).lean()
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
        res.render("home",{...result, docs: products})
      } catch (error) {
        console.log(error)
        res.render("home", "NO SE PUDIERON OBTENER LOS PRODUCTOS")
      }
})

 router.get('/realtimeproducts', async (req, res) => {
    try {
        let cart = await CartsModel.find().lean()
        res.render("realTimeProducts", {
          cart,
          title: "Lista de carritos  actuales",
        } );
      } catch (error) {
        console.log(error)
        res.render("realTimeProducts", "NO SE PUDIERON OBTENER LOS PRODUCTOS")
      }

  })

  router.get('/realtimeproducts/:_id', async (req, res) => {
    try {
        let cart = await CartsModel.findOne({_id: req.params._id}).lean()
        console.log(cart)
        res.render('realTimeProducts',{cart ,products: cart.Products} );
      } catch (error) {
        console.log(error)
        res.render("realTimeProducts", "NO SE PUDIERON OBTENER LOS PRODUCTOS")
      }

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