import * as ProductsServices from "../services/productsServices.js"


export async function getAll (req,res) {
    let limit = req.query?.limit
    try {
        let prod = await ProductsServices.getProduct(limit)
        if (!prod) {
            return res.status(404).send({error: 'no funciona'})
        }  if (limit) {
            const limitacion = prod.splice(0,limit);
            return res.status(200).send(limitacion)
        } else {
          return res.status(200).send(prod)
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }

}

export async function getProduct (req,res) {
    try {
        let id = req.params.id
        let one = await ProductsServices.getProductById(Number(id))
        if (one) {
        return res.status(200).send(one)} 
    } catch (error) {
        return res.status(500).send(error.message)
    } 
}

export async function create (req,res){
    let product = req.body
    try {
       let prod = await ProductsServices.addProduct((product))
        if (prod) {
            return res.status(200).send(prod)
        }

    } catch (error) {
       console.log(error)
        return res.status(500).send(error.message)
    }
}

export async function deleteProduct (req,res) {
let id = req.params.id
    try {
       let one = await ProductsServices.deleteProductById(id)
        return res.send("producto eliminado")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function modify (req,res){
  let pid = req.params.pid
    
 try {
       let productUpdated =  await ProductsServices.updateProductById(Number(pid),req.body)
        if (productUpdated) {
            return res.status(200).send({message: "Producto Modificado"})
        } else {
            return res.status(500).send({error: "El producto no se pudo modificar"})
        }    
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

