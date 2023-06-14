import {ProductModel} from "../Dao/DB/models/productsModel.js"


//Pagina de productos


export default class productServiceMongo {
    
    constructor() { 
        console.log("Working cart with Database persistence in mongodb");
      }
    

    getPaginatedProducts = async (page, limit) => {
        return await ProductModel.paginate({}, { page, limit: (limit), lean: true });
      }
    getProductsByTitle = async (title) => {
        const products = await ProductModel.aggregate([
          { $match: { title: title } },
        ])
      
        return products;
    };  
    getAllProducts = async (limit) => {
        const products = await ProductModel.find().limit(limit).lean();
        return products;
    };  
    sortProductsByPriceDescending = async (products) => {
          products = await ProductModel.aggregate([
            { $sort: {price: -1} },
        ])
        return products;
    };  
    sortProductsByPriceAscending = async (products) => {
         products = await ProductModel.aggregate([
            { $sort: {price: 1} },
          ])
          return products;
    };
    getProductById = async () => {
        try {
            let response = await ProductModel.findOne()
            return response
        } catch (error) {
            throw new Error (error)
        }
    };
    
    addProduct = async (data) => {
        try {
            const response = await ProductModel.create(data);
            return response
        } catch (error) {
            throw new Error (error)
        }
    };
    
    deleteProductById = async (id) => {
        try {
            const response = await ProductModel.deleteOne({ _id: id });
            return response
        } catch (error) {
            throw new Error (error)
        }
    };
    
    updateProduct = async (pid, updatedData) => {
        try {
          const updatedProduct = await ProductModel.findOneAndUpdate({ _id: pid }, updatedData);
          return updatedProduct;
        } catch (error) {
          throw new Error(error.message);
        }
    };
    
}




