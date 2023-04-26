
import { Router } from 'express';
import { ProductModel } from '../Dao/DB/models/productsModel.js';
import { CartsModel } from '../Dao/DB/models/cartsModel.js';
import  cookieParser  from 'cookie-parser';
const router = Router();
router.use(cookieParser('Adm1234'))

//Home

router.get('/', async (req, res)=> {
  try {
    res.render("home");
  } catch (error) {
    throw Error (error);
  }
});


//Product
router.get('/products', async(req, res,) => {
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
        res.render("products",{...result, docs: products})
      } catch (error) {
        console.log(error)
        res.render("products", "NO SE PUDIERON OBTENER LOS PRODUCTOS")
      }
});
router.post('/add-to-cart', async (req, res) => {
  try {
    const { cartId, productId } = req.body;
    const cart = await CartsModel.findById(cartId);
    const product = {
      _id: productId,
      quantity: 1 
    };
    cart.products.push(product);
    await cart.save();
    res.redirect('/products');
  } catch (error) {
    console.error(error);
    return false;
  }
});


//Carrito

router.get('/cart/:_id', async (req, res) => {
    try {
        let cart = await CartsModel.findOne({_id: req.params._id}).populate("products.product").lean()
        console.log(cart)
        res.render('cart',{cart} );
      } catch (error) {
        console.log(error)
        res.render("cart", "NO SE PUDIERON OBTENER LOS PRODUCTOS")
      }

});
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

// Login
router.get('/login', (req, res)=>{
  const {username, password} = req.query;

  if(username !== 'pepe' || password !== 'pepepass'){
      return res.status(401).send("Login failed, check your username")
  }else{
      req.session.user = username;
      req.session.admin = false;
      res.send("Login Successful!!")
  }
})



// destruir la session
router.get('/logout', (req, res)=>{
  req.session.destroy(error => {
      if(error){
          res.json({error: "Error de logout", msg: 'Error al cerrar session'})
      }
      res.clearCookie('connect.sid').send("Sesion cerrada correctamente!!")
  })
});



// Auth middleware
function auth(req, res,next){
  if(req.session.user === 'pepe' && req.session.admin){
      return next();
  }else{
      return res.status(403).send('Usuario no autorizado, para ingresar al recurso')
  }
};

router.get('/private', auth,  (req, res)=>{
  res.send("Si estas viendo esto es porque pasaste la autorizacion a este recurso!!")
});
      

  
export default router;