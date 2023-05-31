import mongoose from "mongoose";
import config from "./config.js";

export default class MongoSigleton {
    static #instance;

    constructor() {
        this.#connectMongoDB();
    }

    static getIntance () {
        if (this.#instance) {
            console.log("Ya esta conectado al DB")
        } else {
           this.#instance = new MongoSigleton (); 
        }

        return this.#instance

    }

    #connectMongoDB = async () => {
        try {
            await mongoose.connect(config.mongoUrl);
            console.log("conectado con DB NuevoMetodo")
        } catch (error) {
            console.error("No se pudo conectar a la base de datos")
            process.exit();
        }
    }

}