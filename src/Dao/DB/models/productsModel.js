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
        carts: {
            type: [
                {
                    cart: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Carts"
                    }
                }
            ],
            default:[]
        }
    }
);

Schema.pre('findOne', function() {
    this.populate("Carts.Cart");
});
export const ProductModel = mongoose.model("Products", Schema);