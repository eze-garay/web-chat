import mongoose from "mongoose";


const Schema = new mongoose.Schema(

    {
        first_name: String,
        last_name: String,
        email:{
            type: String,
            unique: true
        },
        age:Number,
        password: String,
        loggedBy: String,
        rol: {
            type: String,
            default: 'user',
            enum: ['user', 'admin'],
        },
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cart'
        }
    
    }
    
);

export const UserModel = mongoose.model("User", Schema);