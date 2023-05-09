import { Router } from "express";
import { UserModel } from "../Dao/DB/models/userModel.js";
import { isValidPassword } from "../utils.js";
import { generateJWToken } from "../utils.js";


const router = Router();


router.post('/login', async (req,res)=>{
    const  {email , password} = req.body;
    try {
        const user = await UserModel.findOne({email: email})
        console.log("Usuario encontrado para Login")
        console.log(user)

        if(!user){
            console.warn("No hay usuario registrado con el email "+ email)
            return res.status(201).send({error: "no se encontro el mail ", msg: "Usuario no encontrado " + email })
        }
        if(!isValidPassword){
            console.warn("Las credenciales no coinciden "+ email)
            return res.status(201).send({error: "Las credenciales no coinciden  ", msg: "Usuario o contraseña incorrecto" }) 
        }

        const tokenUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role
        }

        const access_token = generateJWToken(tokenUser)
        console.log(access_token)


        res.cookie('jwtCookieToken', access_token, {
            maxAge:6000,
            httpOnly: true,
        })

        // res.send({msg: "Login correcto", jwt: access_token})
        res.send({msg: "Login correcto"})

        
    } catch (error) {
        console.error(error);
        return res.status(500).send({status:"error",error:"Error interno de la applicacion."});
    }
})

export default router