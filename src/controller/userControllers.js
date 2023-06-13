import * as UserServices from "../services/Dao/userServices.js";
import userDto from "../services/dto/user.dto.js"
import jwt from "jsonwebtoken"
import { generateJWToken, isValidPassword, createHash, PRIVATE_KEY} from "../utils.js";
import { UserModel } from "../services/Dao/DB/models/userModel.js";
import { CartsModel } from "../services/Dao/DB/models/cartsModel.js";
 // let newUser =  new userDto (user)




 export async function login(req, res) {
  const { email, password } = req.body;
  try {

    const user = await UserServices.findUserByEmail(email);
    console.log("Usuario encontrado para Login");
    console.log(user);

    if (!user) {
      console.warn("No hay usuario registrado con el email " + email);
      return res.status(500).send({ error: "no se encontro el mail ", msg: "Usuario no encontrado " + email });
    }
    if (!isValidPassword(user, password)) {
      console.warn("Las credenciales no coinciden " + email);
      return res.status(500).send({ error: "Las credenciales no coinciden ", msg: "Usuario o contraseña incorrecto" });
    }

    const cart = await UserModel.findOne({ email: email });
    console.log(cart);

    const tokenUser = {
      id: user._id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      rol: user.rol,
      cart: cart.cart
    };

    const access_token = generateJWToken(tokenUser);
    console.log(access_token);

    res.cookie('jwtCookieToken', access_token, {
      maxAge: 60000,
      httpOnly: true,
    });

    res.json({ status: "success", tokenUser });
  } catch (error) {
    console.error(error);
    return res.send({ status: "error" });
  }
}

 // if (email === "adminCoder@coder.com" && password === "adminCod3r123") { 
  //   const adminToken = jwt.sign({ rol: 'admin' }, PRIVATE_KEY);
  //   req.adminToken = adminToken;
  //   return next();
  // }




// export async function register (req, res) {
//   const { first_name, last_name, email, age, password, rol } = req.body;
//   try {
//     const exists = await UserServices.findUserByEmail(email);
//     if (exists) {
//       console.log("El usuario ya existe.");
//       return res.sendClientError("El usuario ya existe.");
//     }

  
//     const user = {
//       first_name,
//       last_name,
//       age,
//       email,
//       password: createHash (password),
//       rol,
//     };

//     const result = await UserServices.createUser(user);
    
//     res.status(200).send({status: "success", msg: "Usuario creado con exito"+ result.id})
//   } catch (error) {
//     return res.status(401).send({ status: 'error', msg: 'No se puede registrar el usuario' });
//   }
// };


export async function register(req, res) {
  const { first_name, last_name, email, age, password, rol } = req.body;
  try {
    const exists = await UserServices.findUserByEmail(email);
    if (exists) {
      console.log("El usuario ya existe.");
      return res.sendClientError("El usuario ya existe.");
    }

    const user = {
      first_name,
      last_name,
      age,
      email,
      password: createHash(password),
      rol,
    };

   

    const result = await UserServices.createUser(user);

    
    const cart = new CartsModel({
      products: [],
    });
    await cart.save();

   
    result.cart = cart._id;
    await result.save();

    return res.status(200).send({ status: "success", msg: "Usuario creado con éxito" });
  } catch (error) {
    return res.status(401).send({ status: "error", msg: "No se puede registrar el usuario" });
  }
}


export async function creatUser (req,res){
  try {
      const {body} = req;
      const response = await UserServices.createUser(body);
      res.status(200).json(response)
  } catch (error) {
      res.status(400).json(error.message)
  }
}

export async function getAll (req,res){
  try {
      let users = await UserServices.getUser()
      console.log(users);
      res.send(users)
  } catch (error) {
      console.error("No se pudo obtener usuarios con moongose: " + error);
      res.status(500).send({error: "No se pudo obtener usuarios con moongose", message: error});
  }
}

export async function infoUser (req,res){
  try {
      let id = req.params.id
      let user = await UserServices.get(id);
      res.send(user);
  } catch (error) {
      console.error("No se pudo obtener el usuario con moongose: " + error);
      res.status(500).send({error: "No se pudo obtener el usuario con moongose", message: error});
  }
}