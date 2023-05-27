import {ProductModel} from "../Dao/DB/models/productsModel.js"


//Pagina de productos

export async function getPaginatedProducts(page, limit) {
    return await ProductModel.paginate({}, { page, limit: parseInt(limit), lean: true });
}
export async function getProductsByTitle (title) {
    const products = await ProductModel.aggregate([
      { $match: { title: title } },
    ]).exec();
  
    return products;
};  
export async function getAllProducts (limit) {
    const products = await ProductModel.find().limit(limit).lean();
    return products;
};  
export async function sortProductsByPriceDescending (products) {
      products = await ProductModel.aggregate([
        { $sort: {price: -1} },
    ]).exec();
    return products;
};  
export async function sortProductsByPriceAscending (products) {
     products = await ProductModel.aggregate([
        { $sort: {price: 1} },
      ]).exec();
      return products;
};



export async function getProductById () {
    try {
        let response = await ProductModel.findOne()
        return response
    } catch (error) {
        throw new Error (error)
    }
}

export async function addProduct (data){
    try {
        const response = await ProductModel.create(data);
        return response
    } catch (error) {
        throw new Error (error)
    }
}

export async function deleteProductById (id){
    try {
        const response = await ProductModel.deleteOne({ _id: id });
        return response
    } catch (error) {
        throw new Error (error)
    }
}

export async function updateProduct(pid, updatedData) {
    try {
      const updatedProduct = await ProductModel.findOneAndUpdate({ _id: pid }, updatedData);
      return updatedProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  }
