import CustomRouter from "./custom.routes.js";
import { ProductModel } from "../Dao/DB/models/productsModel.js";

export default class ProductsExtendRouter extends CustomRouter {
    init (){
        const productService = new ProductModel();

        this.get("/", ["PUBLIC"], async (req,res)=>{
            let limit = req.query?.limit
            try {
                let prod = await ProductModel.find(limit)
                if (!prod) {
                    return sendInternalServerError("No se pudo mostrar los productos")
                }  if (limit) {
                    const limitacion = prod.splice(0,limit);
                    return res.status(200).send(limitacion)
                } else {
                  return res.status(200).send(prod)
                }
            } catch (error) {
                return res.status(500).send(error.message)
            }
        });   
        
        this.get('/:pid', ["PUBLIC"], async (req, res) => {
            try {
                let id = req.params.pid; 
                let one = await ProductModel.findOne({ _id: id }); 
                if (one) {
                    return res.send(one);
                } else {
                    return res.status(404).send('Producto no encontrado');
                }
            } catch (error) {
                return res.status(500).send(error.message);
            }
        });

        this.post('/product', ["PUBLIC"], async (req, res) =>{
            let product = req.body
            try {
               let prod = await ProductModel.create((product))
                if (prod) {
                    return res.status(200).send(prod)
                }
            } catch (error) {
               console.log(error)
                return res.status(500).send(error.message)
            }

        });

        this.delete('/:id', ["PUBLIC"], async (req, res) =>{
            let id = req.params.id
            try {
               let one = await ProductModel.deleteOne({ _id: id })
                return res.send("producto eliminado")
            } catch (error) {
                return res.status(500).send(error.message)
            }
          
        });

        this.put('/:pid', ["PUBLIC"], async (req, res) => {
            let pid = req.params.pid;
        
            try {
                let product = await ProductModel.findOneAndUpdate({ _id: pid }, req.body);
                if (product) {
                    return res.status(200).send({ message: "Producto modificado" });
                } else {
                    return res.status(500).send({ error: "El producto no se pudo modificar" });
                }
            } catch (error) {
                return res.status(500).send(error.message);
            }
        });
      

    }
}