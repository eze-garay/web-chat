import CustomRouter from "./custom.routes.js";
import { UserModel } from "../Dao/DB/models/userModel.js";
import { isValidPassword, generateJWToken, createHash } from "../utils.js";


export default class UserExtendRouter extends CustomRouter {
    init() {
        const userService = new UserModel();
       
        this.get("/", ["PUBLIC"], (req, res) => {
            res.render("home");
        });

        this.post('/login', ["PUBLIC"], async (req,res)=>{
            const  {email , password} = req.body;
            try {
                const user = await UserModel.findOne({email: email})
                console.log("Usuario encontrado para Login")
                console.log(user)
        
                if(!user){
                    console.warn("No hay usuario registrado con el email "+ email)
                    return res.sendClientError("Usuario no encontrado " + email)
                }
                if(!isValidPassword){
                    console.warn("Las credenciales no coinciden "+ email)
                    return res.sendUnauthorizedError("Usuario o contraseña incorrecto");
                }
        
                const tokenUser = {
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    age: user.age,
                    rol: user.rol
                }
               
        
                const access_token = generateJWToken(tokenUser)
                console.log(access_token)
        
        
                res.cookie('jwtCookieToken', access_token, {
                    maxAge:6000,
                    httpOnly: true,
                })
        
               res.sendSuccess("login correcto")
                
            } catch (error) {
                console.error(error);
                return res.sendInternalServerError("Error interno de la applicacion.");
            }
        })

        this.post('/register',["PUBLIC"], async (req,res)=>{
                const { first_name, last_name, email, age, password, rol } = req.body;
                try {
                    const exists = await UserModel.findOne({ email });
                    if (exists) {
                        console.log("El usuario ya existe.");
                        return res.sendClientError("El usuario ya existe.")
                    }
                    const user = {
                        first_name,
                        last_name,
                        age,
                        email,
                        password: createHash (password),
                        rol,
                        
                    };
                    const result = await UserModel.create(user);
                    return res.sendSuccess("Usuario creado correctamente");
                } catch (error) {
                    return res.sendInternalServerError("Error registrando el usuario: " + error);
                }
            
    
        })












    }
}