

import { CartsModel } from "../Dao/DB/models/cartsModel.js";
import { UserModel } from "../Dao/DB/models/userModel.js";
import { ProductModel } from "../Dao/DB/models/productsModel.js";




export default class CartServicesMongo {
  constructor() {
    console.log("Working cart with Database persistence in mongodb");
  }


  create = async () => {
    const prod = await CartsModel.create({ product: [] });
    return prod;
  };
  
  

  
   getCartById = async (cartId) =>{
    try {
      const cart = await CartsModel.findOne({ _id: cartId }).populate("products.product").lean();
      return cart;
    } catch (error) {
      throw new Error("No se pudo obtener el carrito");
    }
  }
  
  
  
  // export async function getCartById(userId) {
  //   try {
  //     const user = await UserModel.findById(userId).populate('cart').lean();
  //     if (!user || !user.cart) {
  //       throw new Error("El carrito no existe");
  //     }
  
  //     const cart = await CartsModel.findOne({ _id: user.cart._id }).populate("products.product").lean();
  //     return cart;
  //   } catch (error) {
  //     throw new Error("No se pudo obtener el carrito");
  //   }
  // }
  


  addProductToCart = async (cid, pid) => {
    try {
     
      const user = await UserModel.findById(cid).populate('cart');
      console.log(user)

      if (!user) {
        return { success: false, statusCode: 500, message: "U no encontrado" };
      }
  
      if (!user.cart) {
        // Si el usuario no tiene un carrito, crea uno nuevo y asígnalo al usuario
        const cart = new CartsModel();
        await cart.save();
  
        user.cart = cart._id;
        await user.save();
      }
  
      const cart = await CartsModel.findById(user.cart._id);

      console.log(cart)
  
      const product = await ProductModel.findById(pid);
      if (!product) {
        return { success: false, statusCode: 500, message: "Producto no encontrado" };
      }
  
      const productIndex = cart.products.findIndex((p) => p.product && p.product.equals(pid));
  
      if (productIndex !== -1) {
        if (typeof cart.products[productIndex].quantity === 'number') {
          cart.products[productIndex].quantity++;
        } else {
          cart.products[productIndex].quantity = 1;
        }
      } else {
        const newProduct = {
          product: pid,
          quantity: 1
        };
        cart.products.push(newProduct);
      }
      await cart.save();
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, statusCode: 500, message: "Error interno del servidor" };
    }
  }
  // export async function removeProductFromCart(userId, productId) {
    
  
  //     try {
  //       const user = await UserModel.findById(userId).populate('cart');
  //       if (!user || !user.cart) {
  //         throw new Error("El carrito no existe");
  //       }
    
  //      const cart = await CartsModel.findOne({ _id: user.cart._id }).populate("products");
    
  //     const product = cart.products.find(p => p.product.equals(productId));
  
  //     if (!product) {
  //       throw new Error("El producto no existe");
  //     } else {
  //       if (product.quantity === 1) {
  //         cart.products = cart.products.filter(p => !p.product.equals(productId));
  //       } else {
  //         product.quantity -= 1;
  //       }
  //       await cart.save();
  //     }
  
  //     return cart;
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }
  
  //  addProductToCart = async (cid, pid) => {
  //   try {
  //     const cart = await CartsModel.findOne({ _id: cid });
  
  //     if (!cart) {
  //       console.error("El carrito no existe");
  //       return { success: false, statusCode: 404, message: "El carrito no existe" };
  //     }
  
  //     const product = await ProductModel.findOne({ _id: pid });
  //     const productIndex = cart.products.findIndex((p) => p.product && p.product.equals && p.product.equals(product._id));
  
  //     if (productIndex !== -1) {
  //       if (typeof cart.products[productIndex].quantity === 'number') {
  //         cart.products[productIndex].quantity++;
  //       } else {
  //         cart.products[productIndex].quantity = 1;
  //       }
  //     } else {
  //       const newProduct = {
  //         product: product._id,
  //         quantity: 1
  //       };
  //       cart.products.push(newProduct);
  //     }
  
  //     await cart.save();
  //     return { success: true };
  //   } catch (error) {
  //     console.error(error);
  //     return { success: false, statusCode: 500, message: "Error interno del servidor" };
  //   }
  // }
  
   removeProductFromCart = async (cartId, productId) => {
    try {
      const cart = await CartsModel.findOne({ _id: cartId }).populate("products");
  
      if (!cart) {
        throw new Error("El carrito no existe");
      }
  
      const product = cart.products.find(p => p.product.equals(productId));
  
      if (!product) {
        throw new Error("El producto no existe");
      } else {
        if (product.quantity === 1) {
          cart.products = cart.products.filter(p => !p.product.equals(productId));
        } else {
          product.quantity -= 1;
        }
        await cart.save();
      }
  
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
   getCart = async (cartId) => {
    try {
      const cart = await CartsModel.findOne({ _id: cartId }).populate("products.product").lean();
      return cart;
    } catch (error) {
      throw new Error("No se pudo obtener el carrito");
    }
  }



}










