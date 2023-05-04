import mongoose from "mongoose";


const Schema = new mongoose.Schema(
    {
        first_name:{
            type: String,
          

        },
        last_name:{
            type: String,
       
        },
        age:{
            type: Number,
        

        },
        email:{
            type: String,

        },
        password:{
            type: String,
        },
        loggedBy: String,
    },
    {timestamps:true}
);

export const UserModel = mongoose.model("User", Schema);