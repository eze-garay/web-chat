import mongoose from "mongoose";
import dotenv from "dotenv"
import { ProductModel } from "./Dao/DB/models/productsModel.js";

dotenv.config();

mongoose.connect(
    "mongodb+srv://ezequielgaray37:eze251@cluster0.jwum4cn.mongodb.net/ecommerce",
    {   useNewUrlParser: true,
        useUnifiedTopology: true,
    
    
    },    
   (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Conectado con MongoDB");
        }
    }
) 
try {
    let products = await ProductModel.paginate({limit: 10, page: 5});
} catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
}
export default mongoose