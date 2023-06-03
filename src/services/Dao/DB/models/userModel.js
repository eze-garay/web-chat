import mongoose from "mongoose";


const Schema = new mongoose.Schema(

    {
        first_name:{
            type:String,
        },
        last_name: {
            type: String,
        },
        email:{
            type: String,
            unique: true
        },
        age:Number,
        password: String,
        fullName:{
            type: String,
        },
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
    
)
Schema.pre('findById', function() {
    this.populate( "cart.cart")
});

export const UserModel = mongoose.model("User", Schema);