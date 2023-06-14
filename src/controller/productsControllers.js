// import * as productServices from "../services/Dao/productsServices.js"

import { productService } from "../services/factory.js";
import { generateProduct } from "../utils.js";

const persistenceFactory = productService;


export async function getAllProducts(req, res) {
  let limit = req.query.limit;
  if (!limit) {
    limit = "10";
  }
  
  try {
    let products = [];
    let title = req.query.title;
    let page = parseInt(req.query.page);
    if (!page) page = 1;
    const perPage = 9; // Número de productos por página

    let result = await persistenceFactory.getPaginatedProducts(page, perPage);
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/extend/products?page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/api/extend/products?page=${result.nextPage}` : '';
    result.isValid = !(page <= 0 || page > result.totalPages);

    let ordenarPor = req.query.ordenarPor;
    if (title) {
      products = await persistenceFactory.getProductsByTitle(title, limit);
    } else {
      products = await persistenceFactory.getAllProducts(limit);
    }

    if (ordenarPor === 'mayorPrecio') {
      products = await persistenceFactory.sortProductsByPriceDescending(products);
    } else if (ordenarPor === 'menorPrecio') {
      products = await persistenceFactory.sortProductsByPriceAscending(products);
    }

    res.render("products", {...result, docs: products, user: req.user });
  } catch (error) {
    console.log(error);
    res.render("products", { error: "NO SE PUDIERON OBTENER LOS PRODUCTOS" });
  }
};

export async function getProduct (req,res) {
    try {
        let id = req.params.id
        let one = await persistenceFactory.getProductById(Number(id))
        if (one) {
        return res.status(200).send(one)} 
    } catch (error) {
        return res.status(500).send(error.message)
    } 
}

export async function create (req,res){
    let product = []
    for (let i = 0; i < 5; i++) {
      product.push(generateProduct());
  }
    try {
       let prod = await persistenceFactory.addProduct((product))
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
           let one = await persistenceFactory.deleteProductById(id)
            return res.send("producto eliminado")
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }


export  async function updateProduct(req, res) {
        let pid = req.params.pid;
      
        try {
          const updatedProduct = await persistenceFactory.updateProduct(pid, req.body);
          if (updatedProduct) {
            return res.status(200).send({ message: "Producto modificado" });
          } else {
            return res.status(500).send({ error: "El producto no se pudo modificar" });
          }
        } catch (error) {
          return res.status(500).send(error.message);
        }
      }

