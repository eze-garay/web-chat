import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

mongoose.connect(
    "mongodb+srv://ezequielgaray37:eze251@cluster0.jwum4cn.mongodb.net/ecommerce",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    },
    (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Conectado con MongoDB");
        }
    }
) 
export default mongoose