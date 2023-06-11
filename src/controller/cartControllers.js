// import * as cartServices from "../services/Dao/cartsServices.js"

import { cartService }   from "../services/factory.js";



const persistenceFactory = cartService;


export async function createCart (req, res) {
    try {
      const prod = await persistenceFactory.create();
      if (prod) {
        return res.json({
          message: 'Carrito creado con éxito',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  };
  
  export async function addProductToCart(req, res) {
    try {
      const { cid , pid } = req.params;
      const result = await persistenceFactory.addProductToCart(cid, pid);
      if (result) {
        return res.redirect('/api/extend/products/');
      } else {
        return res.status(result.statusCode).json({ error: result.message });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  };

  export async function removeProductFromCart(req, res) {
    try {
      const { cid, pid } = req.body;
  
      const cart = await persistenceFactory.removeProductFromCart( cid, pid );

  
      return res.redirect(`/api/extend/carts/carts/${cart._id}`);
    } catch (error) {
      console.error(error);
      return res.send(false);
    }
  };


  export async function getCartById(req, res) {
    try {
      const cartId = req.params._id;
      const cart = await persistenceFactory.getCart(cartId);
      console.log("entrando a la funcion cart")
      console.log(cart)
  
      res.render('cart', { cart });
    } catch (error) {
      console.error(error);
      res.render("cart", "NO SE PUDIERON OBTENER LOS PRODUCTOS");
    }
  };

  export async function purchaseCart(req, res) {
    try {
      const { cid } = req.params;
      const result = await persistenceFactory.purchaseticket(cid);
      res.json({ status: "success", result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "No se pudo finalizar la compra" });
    }
  };

