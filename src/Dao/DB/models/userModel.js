import mongoose from "mongoose";


const Schema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            minlength: 3,
            maxlength: [10, "El nombre es muy largo"],

        },
        last_name:{
            type: String,
            required: true,
            minlength: 3,
            maxlength: [10, "El apellido es muy largo"],
        },
        age:{
            type: Number,
            required: true,
            min: 18,
            max: 50,

        },
        email:{
            type: String,
            required: true,
            unique: true,
            match: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
            lowercase: true,
            trim: true,
            validate: [
                {
                    validator: (value)=> {
                        if(value.length <10)return false;
                        return true;
                    },
                    message: "El email es muy corto",
                },
            ],

        },
        password:{
            type: Number,
            require: true,
        },
    },
    {timestamps:true}
);

export const UserModel = mongoose.model("User", Schema);