
import mongoose from "mongoose";





const Schema = new mongoose.Schema(
    {
        Products: {
        type: [
            {
                Product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products"
                }
            }
        ],
        default:[]
        }
    });
    Schema.pre('findOne', function() {
        this.populate("Products.Product");
    });
    Schema.pre('findById', function() {
        this.populate("Products.Product");
    });

export const CartsModel = mongoose.model("Carts", Schema);