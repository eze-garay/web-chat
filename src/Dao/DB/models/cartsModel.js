
import mongoose from "mongoose";





const Schema = new mongoose.Schema(
    {
        products: {
          type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {
                    type: Number,
                    default: 1,
                    
                }
            }
        ],
        required: true,
        }
    });
    Schema.pre('findOne', function() {
        this.populate( "products.product")
    });
    Schema.pre('findById', function() {
        this.populate("products.product")
    });
    Schema.pre('findByIdAndUpdate', function() {
        this.populate("products.product")
    });

export const CartsModel = mongoose.model("carts", Schema);