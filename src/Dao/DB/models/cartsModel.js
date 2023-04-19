
import mongoose from "mongoose";





const Schema = new mongoose.Schema(
    {
        product: {
            type: [],
            require: true,
            
            
        },
    }
    
);

export const CartsModel = mongoose.model("Carts", Schema);