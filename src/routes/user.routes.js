import CustomRouter from "../custom/custom.routes.js";
import * as user from "../controller/userControllers.js"

export default class userExtendRouter extends CustomRouter {
  init() {
      
     
      this.post('/login', ["PUBLIC"], user.login);
      
      this.post('/register', ["PUBLIC"], user.register);

      this.get("*", ["PUBLIC"], (req, res) => {
        res.status(404).send("Cannot get that URL!!")
      });

  
  }
}



// router.post('/login', user.login);

// router.post('/register', user.register);

// // router.post('/login', async (req,res)=>{
// //     const  {email , password} = req.body;
// //     try {
// //         const user = await UserModel.findOne({email: email})
// //         console.log("Usuario encontrado para Login")
// //         console.log(user)

// //         if(!user){
// //             console.warn("No hay usuario registrado con el email "+ email)
// //             return res.status(201).send({error: "no se encontro el mail ", msg: "Usuario no encontrado " + email })
// //         }
// //         if(!isValidPassword){
// //             console.warn("Las credenciales no coinciden "+ email)
// //             return res.status(201).send({error: "Las credenciales no coinciden  ", msg: "Usuario o contraseña incorrecto" }) 
// //         }

// //         const tokenUser = {
// //             name: `${user.first_name} ${user.last_name}`,
// //             email: user.email,
// //             age: user.age,
// //             rol: user.rol
// //         }
       

// //         const access_token = generateJWToken(tokenUser)
// //         console.log(access_token)


// //         res.cookie('jwtCookieToken', access_token, {
// //             maxAge:6000,
// //             httpOnly: true,
// //         })

// //        res.send({status: "success", msg:"login correcto" })
        
// //     } catch (error) {
// //         console.error(error);
// //         return res.status(500).send({status:"error",error:"Error interno de la applicacion."});
// //     }
// // })

// router.get("*", (req, res) => {
//     res.status(404).send("Cannot get that URL!!")
//   });
  

// export default router