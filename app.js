import express from 'express'
import handlebars from 'express-handlebars';
import "./src/db.js"
import {Server} from 'socket.io';
import { messageModel } from './src/services/Dao/DB/models/messagesModel.js';
import session from 'express-session';
//import FileStore  from 'session-file-store';
import MongoStore from 'connect-mongo';
import __dirname from './src/utils.js';
import passport from 'passport';
import cors from 'cors';
import compression from 'express-compression';






import initializePassaport from './src/config/passport.config.js';
import cookieParser from 'cookie-parser';
import config from './src/config/config.js';
// import { addLoggerA } from './src/config/loggers.js';
import {addLoggerB} from './src/config/loggersCustom.js'



import viewsRouters from './src/routes/views.routes.js'
import userViewRouters from './src/routes/user.views.routes.js'
import sessionRouter from './src/routes/sessions.routes.js'
// import cartsRouters from './src/routes/cart.routes.js'
// import productRoutes from './src/routes/product.routes.js'
import githubLoginViewRouter from './src/routes/github-login.views.router.js'
import testRouter from './src/routes/test.js'
// import userRoutes from './src/routes/user.routes.js'


import cartExtendRouter from './src/routes/cart.routes.js';
import productExtendRouter from './src/routes/product.routes.js'
import userExtendRouter from './src/routes/user.routes.js'
import emailRouter from './src/routes/email.routes.js'
import smsRouter from  './src/routes/sms.Router.js'



const app = express ()
const PORT = config.port;

//const fileStore = FileStore(session)

//server
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(session({
    //store: new fileStore({path:"./sessions", ttl:40, retries: 0}),
        store:MongoStore.create({
        mongoUrl: "mongodb+srv://ezequielgaray37:eze251@cluster0.jwum4cn.mongodb.net/ecommerce",
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 40
    }),
    secret:"CoderS3cret",
    resave: false,
    saveUninitialized: true
}))

// brotli
app.use(compression({
    brotli: { enabled: true, zlib: {} }
}));


//coockie


app.use(cookieParser('jwtCookieToken'))


//midellwere

initializePassaport();
app.use(passport.initialize());
app.use(passport.session());
app.use(addLoggerB);



//rutas

app.engine('handlebars',handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine','handlebars');




// app.use('/api/products', productRoutes);
// app.use('/api/carts', cartsRouters);
app.use('/', viewsRouters);
app.use('/user', userViewRouters);
app.use('/api/sessions', sessionRouter);
app.use("/github", githubLoginViewRouter);
app.use('/test',testRouter);
// app.use('/api/user', userRoutes);

const CartExtendRouter = new cartExtendRouter();
app.use("/api/extend/carts", CartExtendRouter.getRouter());

const ProductExtendRouter = new productExtendRouter();
app.use("/api/extend/products",ProductExtendRouter.getRouter());

const UserExtendRouter = new userExtendRouter();
app.use("/api/extend/user", UserExtendRouter.getRouter());

app.use("/api/email", emailRouter);
app.use("/api/sms", smsRouter);

// Endpoint de prueba
app.get("/loggerTest", (req, res) => {
    req.logger.debug("Debug message"); // Log de nivel debug
    req.logger.http("HTTP message"); // Log de nivel http
    req.logger.info("Info message"); // Log de nivel info
    req.logger.warning("Warning message"); // Log de nivel warning
    req.logger.error("Error message"); // Log de nivel error
    req.logger.fatal("Fatal message"); // Log de nivel fatal
  
    res.send("Logger test");
});





const httpServer = app.listen(PORT, () => {
    console.log(`server run on port: ${PORT}`);
})
// const mongoInstance = async () => {
//     try {
//         await MongoSigleton.getIntance();
//     } catch (error) {
//         console.error(error);
//     }
// };
// mongoInstance();


//chat

const socketServer = new Server(httpServer);
let messages = []

socketServer.on('connection', socket => {
  
    socket.on('message', async data =>{
       // messages.push(data);
        // socketServer.emit('messageLogs', messages )
        let result = await messageModel.create(data)
        let message = await messageModel.find()

        socketServer.emit("messageLogs", message)

    });

    socket.on('userConnected', data =>{
        socket.broadcast.emit('userConnected', data.user)
    })
    socket.on('authenticated', () => { 
        let length = messages.length
        if (length > 10) {
            socketServer.emit('messageLogs', [...messages].splice(length-10,length))
        } else if (length > 0) {
            socketServer.emit('messageLogs', messages)
        }
    })


})



//test
// const SERVER_PORT = config.port;
// app.listen(SERVER_PORT, () => {
//     console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
//     const executeTest = config.runTests;
//     if (executeTest) {
//         console.log("Ejecutando set de pruebas para suma:");
//         //Escenarios:
//         let testPasados = 0;
//         const testTotales = 4;

//         //Test 1: La función debe devolver null si algun parametro no es numérico.
//         testPasados = escenario1(testPasados);

//         //Test 2: La funcion debe devolver 0 si no se pasa ningún parámetro:
//         testPasados = escenario2(testPasados);

//         //Test 3: La función debe poder realizar la suma correctamente.
//         testPasados = escenario3(testPasados);

//         //Test 4: La función debe poder realizar la suma con cualquier cantidad de numeros.
//         testPasados = escenario4(testPasados);

//         console.log(`Test ejecutados: ${testTotales}, pasaron: ${testPasados}`);
//     }
// });

// const escenario1 = (testPasados) => {
//     console.log("Test 1: La función debe devolver null si algun parametro no es numérico.");
//     // Given --> lo que le doy a la funcion para ejecutar la prueba
//     const numero1 = "2";
//     const numero2 = 2;

//     // Then o ejecucion 
//     let result = suma(numero1, numero2)

//     // Assert o validacion 
//     if (result == null) {
//         console.log("Test 1: pasa! \n");
//         testPasados++
//     } else console.error(`Test 1: No pasado, se recibió ${typeof result}, pero se esperaba null.`);

//     return testPasados;
// };


// const escenario2 = (testPasados) => {
//     console.log("Test 2: La funcion debe devolver 0 si no se pasa ningún parámetro:");

//     // Then
//     let result = suma();

//     // Assert 
//     if (result === 0) {
//         console.log("Test 2: pasa!! \n");
//         testPasados++;
//     } else {
//         console.error(`Test 2: No pasado, se recibió ${result}, pero se esperaba 0.`);
//     }
//     return testPasados;
// }

// const escenario3 = (testPasados) => {
//     console.log("Test 3: La función debe poder realizar la suma correctamente.");

//     // Given
//     const numero1 = 3;
//     const numero2 = 2;

//     // Then o ejecucion 
//     let result = suma(numero1, numero2)

//     // Assert
//     const expected = 5;
//     if (result === expected) {
//         console.log("Test 3: Pasado!\n");
//         testPasados++;
//     }
//     else {
//         console.error(`Test 3: No pasado, se recibió ${result}, pero se esperaba ${expected}.`);
//     }
//     return testPasados;

// }

// const escenario4 = (testPasados) => {
//     console.log("Test 4: La función debe poder realizar la suma con cualquier cantidad de numeros");

//     // Give
//     const numerosEntrada = [1, 2, 3, 4, 5]

//     // Then
//     let result = suma(...numerosEntrada);

//     // Assert
//     const expected = 15;
//     if (result === expected) {
//         console.log("Test 4: Pasado!\n");
//         testPasados++;
//     } else {
//         console.error(`Test 4: No pasado, se recibió ${result}, pero se esperaba ${expected}.`);
//     }
//     return testPasados;
// }




