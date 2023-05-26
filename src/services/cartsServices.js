

import { CartsModel } from "../Dao/DB/models/cartsModel.js";
import { ProductModel } from "../Dao/DB/models/productsModel.js";


export async function create () {
  const prod = await CartsModel.create({ product: [] });
  return prod;
};

export async function getCartById(cid) {
  const one = await CartsModel.findById({ _id: cid });
  return one;
}

export async function addProductToCart(cid, pid) {
  try {
    const cart = await CartsModel.findOne({ _id: cid });

    if (!cart) {
      console.error("El carrito no existe");
      return { success: false, statusCode: 404, message: "El carrito no existe" };
    }

    const product = await ProductModel.findOne({ _id: pid });
    const productIndex = cart.products.findIndex((p) => p.product && p.product.equals && p.product.equals(product._id));

    if (productIndex !== -1) {
      if (typeof cart.products[productIndex].quantity === 'number') {
        cart.products[productIndex].quantity++;
      } else {
        cart.products[productIndex].quantity = 1;
      }
    } else {
      const newProduct = {
        product: product._id,
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

export async function removeProductFromCart(cartId, productId) {
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

export async function getCart(cartId) {
  try {
    const cart = await CartsModel.findOne({ _id: cartId }).populate("products.product").lean();
    return cart;
  } catch (error) {
    throw new Error("No se pudo obtener el carrito");
  }
}

