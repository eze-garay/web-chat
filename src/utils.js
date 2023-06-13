import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import passport from 'passport';


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)



// hASh

export const createHash = paswoord => bcrypt.hashSync(paswoord, bcrypt.genSaltSync(10))

//validar

export const isValidPassword = (user, password )=>{
   console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
   return bcrypt.compareSync(password, user.password)
}

export const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";


export const generateJWToken = (user)=>{
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '1h'});
}
export const authToken = (req, res, next) => {
    //  El JWT se guarda en los headers de auth
    const authHeader = req.headers.authorization;
    console.log("Token present in header auth:");
    console.log(authHeader);

    if(!authHeader){
        return res.status(401).send({error: "User not authenticated or missing token."});
    }

    const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra Bearer.
    //Validar token
    jwt.verify(token, PRIVATE_KEY, (error, credentials)=>{
        if (error) return res.status(401).send({error: "Token invalid, Unauthorized!"});
        //Token OK
        req.user = credentials.user;
        console.log(req.user);
        next();
    })
}

// export const passportCall = (strategy) => {
//     return async (req, res, next) => {
//         console.log("Entrando a llamar strategy: ");
//         console.log(strategy);
//         passport.authenticate(strategy,{ session: false }, function (err, user, info) {
//             if (err) return next(err);
//             if (!user) {
//                 return res.status(401).send({error: info.messages?info.messages:info.toString()});
//             }
//             console.log("Usuario obtenido del strategy: ");
//             console.log(user);
//             req.user = user;
//             next();
//         })(req, res, next);
//     }
// };
export const passportCall = (strategy) => {
  return async (req, res, next) => {
    console.log("Entrando a llamar strategy: ");
    console.log(strategy);
    passport.authenticate(strategy, { session: false }, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
      }
      console.log("Usuario obtenido del strategy: ");
      console.log(user);
      req.user = user;
      next();
    })(req, res, next);
  };
};



// para manejo de Auth
export const authorization = (rol) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send("Unauthorized: User not found in JWT"); 
        if (req.user.rol !== rol) {
            return res.status(403).send("Forbidden: El usuario no tiene permisos con este rol."); 
        }
        next();
    }
};

export const adminValidation = async (req, res, next) => {
    const { email, password } = req.body;
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      const adminToken = jwt.sign({ rol: 'admin' }, PRIVATE_KEY);
      res.send({ token: adminToken, message: 'Inicio de sesión como administrador' });
    } else {
      next();
    }
  };



export default __dirname;