import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            minlength: 3,
            maxlength: [20, "El nombre es muy largo"],

        },
        description:{
            type: String,
            required: true,
            minlength: 3,
            maxlength: [50, "El nombre es muy largo"],
        },
        price:{
            type: Number,
            required: true,
        },
        code:{
            type: Number,
            required: true,
        },
        stock:{
            type: Number,
            required: true,
        },
        status:{
            type: Boolean,
            required: true,
        },
        thumbnail:{
            type: String,
            required: true,
            minlength: 3,
        },

    }
);


export const ProductModel = mongoose.model("Products", Schema);