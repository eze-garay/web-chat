import {ProductModel} from "../Dao/DB/models/productsModel.js"


export async function getProduct () {
    try {
        let response = await ProductModel.find()
        return response
    } catch (error) {
        throw new Error(error)
    }
}


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

export async function deleteProductById (){
    try {
        const response = await ProductModel.deleteOne();
        return response
    } catch (error) {
        throw new Error (error)
    }
}


export async function updateProductById (...data){
      
   try {
         let productUpdated =  await ProductModel.findOneAndUpdate(...data)

         return productUpdated

      } catch (error) {
        throw new Error (error)
      }
  }

