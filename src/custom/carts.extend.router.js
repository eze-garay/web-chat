import CustomRouter from "./custom.routes.js";
import { CartsModel } from "../Dao/DB/models/cartsModel.js";
import { ProductModel } from "../Dao/DB/models/productsModel.js";


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

        this.get('/:cid', ["PUBLIC"], async (req,res)=>{
            let cid = req.params.cid
    
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
              const { cid, pid } = req.body;
              const cart = await CartsModel.findOne ({_id : cid});
              const product = await ProductModel.findOne ({_id : pid});
              const productIndex = cart.products.findIndex(
                (p) => p.product.equals(product._id)
              );
          
              if (productIndex !== -1) {
               
                cart.products[productIndex].quantity++;
              } else {
               
                const newProduct = {
                  product: product._id,
                  quantity: 1 
                };
                cart.products.push(newProduct);
              }
          
              await cart.save();
              res.redirect('products');
            } catch (error) {
              console.error(error);
              return false;
            }
          });
          




    }
}