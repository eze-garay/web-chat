import mongoose from "mongoose";

import { CartsModel } from "../Dao/DB/models/cartsModel.js";
import { ProductModel } from "../Dao/DB/models/productsModel.js";


export async function addCart() {

  try {
    let prod = {
      product :"Id",
      quantity : 1,
    }
    let cart = await CartsModel.create(prod);
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
  
    let cart = await CartsModel.findById(cartId);
    let product = await ProductModel.findById(productId);
    cart.products.forEach((product)=>{
      if (product._id == productId) {
        product.quantity+=1;
      }
    });
    await cart.save();
    await cart.populate("products.product");
  } catch (error) {
    console.log(error);
  }
}





