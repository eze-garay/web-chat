

import { CartsModel } from "../Dao/DB/models/cartsModel.js";



export async function createCart (){
  try {
      let cart = await CartsModel.create({product:[]})
      return cart
  } catch (error) {
      throw new Error(error)
  }
}


export async function getCartById (cartId) {
    try {
        let carts = await CartsModel.findById({_id: cartId });
        return carts
    } catch (error) {
        throw Error(error)
    } 
}




export async function addToCart (cartId, productId) {
  try {
  
    let cart = await CartsModel.findOne({ cartId });

   
    const productIndex = cart.products.findIndex(
      (product) => product.product === productId
    );
    
    if (productIndex >= 0) {

      cart.products[productIndex].quantity++;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }
    await cart.save();

    await cart.populate("products.product");

    return cart;
  } catch (error) {
    console.log(error);
  }
}


export async function deleteProduct (cartId, productId) {
  const cart = await CartsModel.findOne({cartId}).populate("products")
  if (!cart) {
    return "El carrito no existe"
  }
  let prod = cart.products.find(p => p.product.equals(productId))
  console.log(prod)
  if (!prod) {
    return "El producto no existe"
  } else {
    if (prod.quantity == 1) {
      cart.products = cart.products.filter(p => !p.product.equals(productId))
    } else {
      prod.quantity -= 1
    }
    await cart.save()
  }
}




