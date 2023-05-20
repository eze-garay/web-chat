import CustomRouter from "./custom.routes.js";
import { CartsModel } from "../Dao/DB/models/cartsModel.js";
import { ProductModel } from "../Dao/DB/models/productsModel.js";

const Regex = /^[0-9a-fA-F]{24}$/;

export default class UserExtendRouter extends CustomRouter {
    init() {
        const cartsModel = new CartsModel();

        this.post('/', ["PUBLIC"], async (req,res)=>{
            try {
        
                let prod = await CartsModel.create({product:[]})
                if (prod) {
                    return res.json({
                        message: 'Carrito creado con éxito',
                    });
                }
            } catch (error) {
                console.log(error)
                return res.status(500).send(error.message)
            }
        })

        this.get('/:cid', ["PUBLIC"] , async (req,res)=>{
            let {cid} = req.params
    
            try {
                let one = await CartsModel.findById({_id: cid })
                if (one) {
                    return res.status(200).send(one)
                } else {
                    return res.status(404).send({error: 'Carrito no econtrado'})
                } 
            } catch (error) {
                return res.status(500).send(error.message)
            }
        })

        this.post('/:cid/add/:pid', ["PUBLIC"], async (req, res) => {
          try {
            const { cid, pid } = req.body; // Cambio a req.params para obtener los valores de la URL
            const cart = await CartsModel.findOne({_id: cid});
        
            if (!cart) {
              // Si el carrito no existe, puedes manejar el error de alguna manera
              console.error("El carrito no existe");
              return res.status(404).json({ error: "El carrito no existe" });
            }
        
            const product = await ProductModel.findOne({_id: pid});
            const productIndex = cart.products.findIndex((p) => p.product && p.product.equals && p.product.equals(product._id));
        
            if (productIndex !== -1) {
              // Verificar si cart.products[productIndex].quantity es un número
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
            res.redirect('/products');
          } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error interno del servidor" });
          }
        });
        this.post('/cart/eliminar', ["PUBLIC"], async (req, res) => {
          try {
            const {cartId, productId} = req.params;
            const cart = await CartsModel.findOne({cartId}).populate("products")
            if (!cart) {
              return res.send("El carrito no existe")
            }
            let prod = cart.products.find(p => p.product.equals(productId))
            console.log(prod)
            if (!prod) {
              return res.send("El producto no existe")
            } else {
              if (prod.quantity == 1) {
                cart.products = cart.products.filter(p => !p.product.equals(productId))
              } else {
                prod.quantity -= 1
              }
              await cart.save()
            }
            res.redirect('/cart/' + cart._id)
          } catch (error) {
            console.error(error);
            return res.send(false);
          } });

        this.get(`/carts/:_id${Regex}`, ["PUBLIC"], async (req, res) => {
          try {
              let cart = await CartsModel.findOne({_id: req.params._id}).populate("products.product").lean()
              console.log(cart)
              res.render('cart',{cart} );
            } catch (error) {
              console.log(error)
              res.render("cart", "NO SE PUDIERON OBTENER LOS PRODUCTOS")
            }
      
      });




    }
}