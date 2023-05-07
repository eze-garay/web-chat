import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'



const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)



// hASh

export const createHash = paswoord => bcrypt.hashSync(paswoord, bcrypt.genSaltSync(10))

//validar

export const isValidPassword = (user, password )=>{
   console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
   return bcrypt.compareSync(password, user.password)
}

const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";


export const generateJWToken = (user)=>{
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'});
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



export default __dirname;