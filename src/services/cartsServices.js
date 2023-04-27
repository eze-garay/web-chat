import mongoose from "mongoose";

import { CartsModel } from "../Dao/DB/models/cartsModel.js";


export async function addCart() {
  try {
    let product
    let cart = await CartsModel.create(product)
    return cart;
  } catch (error) {
    throw Error(error);
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




export const addToCart = async (cartId, productId) => {
  try {
  
    let cart = await CartsModel.findOne({ cartId });

   
    const productIndex = cart.products.findIndex((product) => product.product._id.toString() == productId);
    const Index = cart.products.findIndex((product) => product.product._id.toString())
    console.log(Index);
    
    if (productIndex >= 0) {

      cart.products[productIndex].quantity+=1;
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





