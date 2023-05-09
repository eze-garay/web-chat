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
        role: {
            type: String,
            default: 'user',
            enum: ['user', 'admin'],

    }
    
    }
    
);

export const UserModel = mongoose.model("User", Schema);