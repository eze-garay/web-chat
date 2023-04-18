import { CartsModel } from "../Dao/DB/models/cartsModel.js";


export async function addCart (cart){
  
    try {
        const response = await CartsModel.create(cart);
        return response
    } catch (error) {
        throw Error(error)
    }
}


export async function getCartById (){
    try {
        let carts = await CartsModel.findOne();
        return carts
    } catch (error) {
        throw Error(error)
    } 
}



  export async function addProductToCart(cId, pId) {
    try {
      const cart = await CartsModel.findById(cId);
      if (!cart) {
        return 'Carrito no encontrado';
      }
      const productIndex = cart.products.findIndex(product => product.productId == pId);
      if (productIndex >= 0) {
        cart.products[productIndex].quantity++;
      } else {
        cart.products.push({ productId: pId, quantity: 1 });
      }
      await cart.save();
      return 'Producto añadido';
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  }


