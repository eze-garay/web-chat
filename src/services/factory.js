import config from '../config/config.js';
import MongoSingleton from '../config/mongo-db-singleton.js';

// Para cambiar de persistencia
// node src/app.js --persist files --mode dev

let cartService

switch (config.persistence) {
    case 'mongodb':
        const mongoInstance = async () => {
            console.log("Entrando a iniciar Service para MongoDb");
            try {
                await MongoSingleton.getIntance();
            } catch (error) {
                console.error(error);
                process.exit(0);
            }
        };
        mongoInstance();
        const { default: CartServicesMongo } = await import('../services/Dao/cartsServices.js')
        cartService = new CartServicesMongo();
        console.log("Cart service loaded:");
        console.log(cartService);
        break;
    case 'files':
        const { default:  cartManager } = await import('../services/Dao/FileSystem/carritoManager.js')
        cartService = new  cartManager();
        console.log("Cart files service loaded:");
        console.log(cartService);
        break;

    default:
        break;
}

export { cartService }

let productService

switch (config.persistence) {
    case 'mongodb':
        const mongoInstance = async () => {
            console.log("Entrando a iniciar Service para MongoDb");
            try {
                await MongoSingleton.getIntance();
            } catch (error) {
                console.error(error);
                process.exit(0);
            }
        };
        mongoInstance();
        const { default: productServiceMongo } = await import('../services/Dao/productsServices.js')
        productService = new productServiceMongo();
        console.log("Product service loaded:");
        console.log(productService);
        break;
    case 'files':
        const { default: productManager } = await import('../services/Dao/FileSystem/productManager.js')
        productService = new productManager();
        console.log("Product files service loaded:");
        console.log(productService);
        break;

    default:
        break;
}

export { productService }

