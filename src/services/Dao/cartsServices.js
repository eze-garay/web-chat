

import { CartsModel } from "../Dao/DB/models/cartsModel.js";
import { UserModel } from "../Dao/DB/models/userModel.js";
import * as TicketService from "../Dao/ticketServices.js"
import mongoose from "mongoose";
import nodemailer from 'nodemailer'
import config from "../../config/config.js";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: config.gmailAccount,
    pass: config.gmailAppPassword
  }
});




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
  };

  addProductToCart = async (cid, pid) => {
    try {
     
      const user = await UserModel.findOne({cid}).populate('cart');
      console.log(user)

      if (!user) {
        return { success: false, statusCode: 500, message: "U no encontrado" };
      }

  
      const cart = await CartsModel.findOne({ _id: user.cart });
      

      console.log(cart)
  
    
      const productIndex = cart.products.findIndex(
        (p) => p.product.equals(mongoose.Types.ObjectId(pid))
      );
    
  
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
  };
  removeProductFromCart = async (cid, pdi) => {
    try {
      const user = await UserModel.findOne({cid}).populate('cart');
      console.log(user)
   
      const cart = await CartsModel.findOne({ _id: user.cart._id });
      console.log(cart)
  
      const product = cart.products.find(p => p.product.equals(mongoose.Types.ObjectId(pdi)));
  
      if (!product) {
        throw new Error("El producto no existe");
      } else {
        if (product.quantity === 1) {
          cart.products = cart.products.filter(p => !p.product.equals(mongoose.Types.ObjectId(pdi)));
        } else {
          product.quantity -= 1;
        }
        await cart.save();
      }
  
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  };
   getCart = async (cartId) => {
    try {
      const cart = await CartsModel.findOne({ _id: cartId }).populate("products.product").lean();
      return cart;
    } catch (error) {
      throw new Error("No se pudo obtener el carrito");
    }
  };

  purchaseCart = async (cartId) => {

    const cart = await CartsModel.findById(cartId).populate('products.product');
    console.log(cart)
  
    const productsToPurchase = [];
    const productsNotPurchased = [];
  
    for (const item of cart.products) {
      const product = item.product;
      const quantityInCart = item.quantity;
  
      if (product.stock >= quantityInCart) {
        productsToPurchase.push({
          product: product._id,
          quantity: quantityInCart
        });
        product.stock -= quantityInCart;
        await product.save();
      } else {
        productsNotPurchased.push(product._id);
      }
    }
  
    if (productsToPurchase.length > 0) {
      const totalPrice = productsToPurchase.reduce(
        (total, item) => total + (item.product.price * item.quantity),
        0
      );
  
      return { productsToPurchase, productsNotPurchased, totalPrice };
    } else {
      return { productsToPurchase: [], productsNotPurchased, totalPrice: 0 };
    }
  };
  
  updateCart = async (cartId, productsNotPurchased) => {
    const productsNotPurchasedIds = productsNotPurchased.map(id => id.toString());
    const cart = await CartsModel.findById(cartId);
    cart.products = cart.products.filter(item => productsNotPurchasedIds.includes(item.product.toString()));
    await cart.save();
  };


  purchaseticket = async (cid) => {
    try {
      const cart = await CartsModel.findOne({ cid }).populate('products.product');
      const user = await UserModel.findOne({ cart: cart._id }).populate('cart');
  
      const productsToPurchase = [];
      const productsNotPurchased = [];
  
      for (const item of cart.products) {
        const product = item.product;
        const quantityInCart = item.quantity;
  
        if (product.stock >= quantityInCart) {
          productsToPurchase.push({
            product: product,
            quantity: quantityInCart
          });
          product.stock -= quantityInCart;
          await product.save();
        } else {
          productsNotPurchased.push(product);
        }
      }
  
      let totalPrice = 0;
  
      if (productsToPurchase.length > 0) {
        totalPrice = productsToPurchase.reduce(
          (total, item) => total + (item.product.price * item.quantity),
          0
        );
      }
  
      const purchaser = user.email;
      const ticket = await TicketService.createTicket(totalPrice, purchaser);
      console.log(ticket);
  
      await ticket.save();
  
      const productsToPurchaseDetails = productsToPurchase.map(item => {
        const product = item.product;
        const quantity = item.quantity;
        const totalPrice = product.price * quantity;
        return `<p>Producto: ${product.title} - Precio: ${product.price} - Cantidad: ${quantity} - Total: ${totalPrice}</p>`;
      });
  
      const productsNotPurchasedDetails = productsNotPurchased.map(product => {
        return `<p>Producto: ${product.title}</p>`;
      });
  
      const mailOptions = {
        from: "Coder Test " + config.gmailAccount,
        to: user.email,
        subject: "Ticket de compra",
        html: `<div>
          <h1>Ticket de compra</h1>
          <p>Detalles del ticket:</p>
          ${productsToPurchaseDetails.join("")}
          <p>Productos sin stock:</p>
          ${productsNotPurchasedDetails.join("")}
          <p>Total: ${totalPrice}</p>
        </div>`
      };
  
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Ticket enviado: ', info.messageId);
        }
      });
  
      cart.products = productsToPurchase.map(item => {
        return {
          product: item.product._id,
          quantity: item.quantity
        };
      });
      await cart.save();
  
      if (productsNotPurchased.length === 0) {
        return { ticket, cart };
      } else {
        return { productsNotPurchased };
      }
  
    } catch (error) {
      return { success: false, statusCode: 500, message: "Error interno del servidor" };
    }
  }
  
  





}










