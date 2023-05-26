
import { Router } from 'express';
import { ProductModel } from '../Dao/DB/models/productsModel.js';
import { passportCall } from '../utils.js';
const router = Router();

const Regex = /^[0-9a-fA-F]{24}$/;

//Home

router.get('/', async (req, res)=> {
  try {
    res.render("login");
  } catch (error) {
    throw Error (error);
  }
});

router.get('/home', async (req, res)=> {
  try {
    res.render("home");
  } catch (error) {
    throw Error (error);
  }
});


//Product
router.get('/products',passportCall('jwt', { session: false }), async(req, res,) => {
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
        result.prevLink = result.hasPrevPage?`http://localhost:8080/products?page=${result.prevPage}`:'';
        result.nextLink = result.hasNextPage?`http://localhost:8080/products?page=${result.nextPage}`:'';
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
       
        res.render("products",{...result, docs: products, user: req.user })
      } catch (error) {
        console.log(error)
        res.render("products", "NO SE PUDIERON OBTENER LOS PRODUCTOS")
      }
});


//Chat
router.get('/message', async (req, res) =>{
    res.render('message');
})
//Session

router.get('/session', (req, res)=>{
  if(req.session.counter){
      req.session.counter++;
      res.send(`Se ha visitado este sitio ${req.session.counter} veces` )
  }else{
      req.session.counter = 1;
      res.send("Bienvenide")
  }
})


// En caso de pasar datos filtrar antes
// router.param("_id", async (req, res, next, ) => {
//   console.log("Buscando nombre de mascota con valor");
//   try {
//       let result = await CartsModel.findById({_id: req.params._id});
//       if (!result) {
//           req.cart = null;
//       } else {
//           req.cart = result;
//       }
//       next();
//   } catch (error) {
//       console.error("Error consultando las mascotas");
//       res.status(500).send({ error: "Error consultando las mascotas", message: error });
//   }
// });

  
export default router;