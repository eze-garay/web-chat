import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = new mongoose.Schema(
    {
        title:{
            type: String,
            default: true,
            minlength: 3,
            maxlength: [20, "El nombre es muy largo"],

        },
        description:{
            type: String,
            default: true,
            minlength: 3,
            maxlength: [50, "El nombre es muy largo"],
        },
        price:{
            type: Number,
            default: true,
        },
        code:{
            type: Number,
            default: true,
        },
        stock:{
            type: Number,
            default: true,
        },
        status:{
            type: Boolean,
            default: true,
        },
        thumbnail:{
            type: String,
            default: true,
            minlength: 3,
        },

        

    }
);

Schema.plugin(mongoosePaginate);
export const ProductModel = mongoose.model("Products", Schema);