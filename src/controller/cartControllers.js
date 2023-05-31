import * as cartServices from "../services/cartsServices.js"



export async function createCart (req, res) {
    try {
      const prod = await cartServices.create();
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
  
  export async function getCart(req, res) {
    const { cid } = req.params;
  
    try {
      const one = await cartServices.getCartById(cid);
      if (one) {
        return res.status(200).send(one);
      } else {
        return res.status(404).send({ error: 'Carrito no encontrado' });
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  export async function addProductToCart(req, res) {
    try {
      const { cid, pid } = req.body;
      const result = await cartServices.addProductToCart(cid, pid);
      if (result) {
        return res.redirect('/api/extend/products');
      } else {
        return res.status(result.statusCode).json({ error: result.message });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  export async function removeProductFromCart(req, res) {
    try {
      const { cartId, productId } = req.body;
  
      const cart = await cartServices.removeProductFromCart(cartId, productId);
  
      return res.redirect("/api/extend/carts/carts/644afbd4483344a1d2570cbc");
    } catch (error) {
      console.error(error);
      return res.send(false);
    }
  }

  export async function getCartById(req, res) {
    try {
      const cartId = req.params._id;
      const cart = await cartServices.getCart(cartId);
  
      res.render('cart', { cart });
    } catch (error) {
      console.error(error);
      res.render("cart", "NO SE PUDIERON OBTENER LOS PRODUCTOS");
    }
  }
