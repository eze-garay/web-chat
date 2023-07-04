import * as UserServices from "../services/Dao/userServices.js";
import { generateJWToken, isValidPassword, createHash, PRIVATE_KEY} from "../utils.js";
import { UserModel } from "../services/Dao/DB/models/userModel.js";
import { CartsModel } from "../services/Dao/DB/models/cartsModel.js";
import { generateUserErrorInfo, userError } from "../services/Dao/Error/messages/user-creation-error.message.js";
import CustomError from "../services/Dao/Error/CustomError.js";
import EErrors from "../services/Dao/Error/errors-enum.js";
import jwt from 'jsonwebtoken';
import { faker } from "@faker-js/faker";
 // let newUser =  new userDto (user)




 export async function login(req, res) {
  const { email, password } = req.body;
  try {
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      const adminToken = jwt.sign({ rol: 'admin' }, PRIVATE_KEY);
      return res.send({ token: adminToken, message: 'Inicio de sesión como administrador' });
    }

    const user = await UserServices.findUserByEmail(email);

    if (!user) {
      const errorInfo = userError({ email });
      throw new CustomError("Error de inicio de sesión", "No se encontró el correo electrónico", errorInfo, EErrors.DATABASE_ERROR);
    }

    if (!isValidPassword(user, password)) {
      console.warn("Las credenciales no coinciden " + email);
      return res.status(500).send({ success: false, payload: { error: "Las credenciales no coinciden ", msg: "Usuario o contraseña incorrecto" } });
    }

    const cart = await UserModel.findOne({ email: email });

    const tokenUser = {
      id: user._id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      rol: user.rol,
      cart: cart.cart
    };

    const access_token = generateJWToken(tokenUser);

    res.cookie('jwtCookieToken', access_token, {
      maxAge: 60000,
      httpOnly: true,
    });

    res.json({ success: true, status: "success", tokenUser });
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
}

export async function register(req, res) {
  const { first_name, last_name, email, age, password, rol } = req.body;
  try {
    if (!first_name || !last_name || !email || !age || !password) {
      const user = {
        first_name,
        last_name,
        age,
        email,
        password: createHash(password),
        rol,
      };

      const errorInfo = generateUserErrorInfo(user);
      throw new CustomError("Error de registro", null, errorInfo, EErrors.INVALID_TYPES_ERROR);
  }


    const exists = await UserServices.findUserByEmail(email);
    if (exists) {
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

    return res.status(200).send({ success: true, status: "success", msg: "Usuario creado con éxito" } );
  } catch (error) {
    return res.status(500).send({ success: false, status: 'error', msg: error.message });
  }
}

export async function createUser(req, res) {
  try {
    const { body } = req;
    const response = await UserServices.createUser(body);
    res.status(200).json({ success: true, payload: response });
  } catch (error) {
    res.status(400).json({ success: false, payload: error.message });
  }
}

export async function getAll(req, res) {
  try {
    let users = await UserServices.getUser();
    console.log(users);
    res.send({ success: true, payload: users });
  } catch (error) {
    console.error("No se pudo obtener usuarios con mongoose: " + error);
    res.status(500).send({ success: false, payload: { error: "No se pudo obtener usuarios con mongoose", message: error } });
  }
}

export async function infoUser(req, res) {
  try {
    let id = req.params.id;
    let user = await UserServices.get(id);
    res.send({ success: true, payload: user });
  } catch (error) {
    console.error("No se pudo obtener el usuario con mongoose: " + error);
    res.status(500).send({ success: false, payload: { error: "No se pudo obtener el usuario con mongoose", message: error } });
  }
}

export const fakeUser = (req, res) => {
  let first_name = faker.name.firstName();
  let last_name = faker.name.lastName();
  let email = faker.internet.email();
  let age = faker.random.numeric(2);
  let password = faker.internet.password();
  res.send({first_name, last_name, email, age, password});
};
