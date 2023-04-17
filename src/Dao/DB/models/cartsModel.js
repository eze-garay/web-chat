import mongoose from "mongoose";





const Schema = new mongoose.Schema(
    {
        product: {
            type: [],
            
        },
    }
    
);

export const CartsModel = mongoose.model("Carts", Schema);