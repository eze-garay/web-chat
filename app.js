import express from 'express'
import handlebars from 'express-handlebars';
import "./src/db.js"
import {Server} from 'socket.io';
import { messageModel } from './src/Dao/DB/models/messagesModel.js';
import session from 'express-session';
//import FileStore  from 'session-file-store';
import MongoStore from 'connect-mongo';
import __dirname from './src/utils.js';
import passport from 'passport';
import initializePassaport from './src/config/passport.config.js';
import cookieParser from 'cookie-parser';
import config from './src/config/config.js';



import viewsRouters from './src/routes/views.routes.js'
import userViewRouters from './src/routes/user.views.routes.js'
import sessionRouter from './src/routes/sessions.routes.js'
import cartsRouters from './src/routes/cart.routes.js'
import productRoutes from './src/routes/product.routes.js'
import githubLoginViewRouter from './src/routes/github-login.views.router.js'
import UserExtendRouter from './src/custom/users.extend.router.js';
import userRoutes from './src/routes/user.routes.js'


const app = express ()
const PORT = config.port;

//const fileStore = FileStore(session)

//server
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
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


//coockie


app.use(cookieParser('jwtCookieToken'))


//midellwere

initializePassaport();
app.use(passport.initialize());
app.use(passport.session());



//rutas

app.engine('handlebars',handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine','handlebars');




app.use('/api/products', productRoutes);
app.use('/api/carts', cartsRouters);
app.use('/', viewsRouters);
app.use('/user', userViewRouters);
app.use('/api/sessions', sessionRouter);
app.use("/github", githubLoginViewRouter);
app.use('/api/user', userRoutes);

const userExtendRouter = new UserExtendRouter();
app.use("/api/extend/users", userExtendRouter.getRouter());


//chat

const httpServer = app.listen(PORT, () => {
    console.log(`server run on port: ${PORT}`);
})

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






