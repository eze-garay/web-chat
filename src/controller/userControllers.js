import * as UserServices from "../services/Dao/userServices.js";
import { generateJWToken, isValidPassword, createHash, PRIVATE_KEY} from "../utils.js";
import { UserModel } from "../services/Dao/DB/models/userModel.js";
import { CartsModel } from "../services/Dao/DB/models/cartsModel.js";
import { generateUserErrorInfo, userError } from "../services/Dao/Error/messages/user-creation-error.message.js";
import CustomError from "../services/Dao/Error/CustomError.js";
import EErrors from "../services/Dao/Error/errors-enum.js";
 // let newUser =  new userDto (user)




 export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserServices.findUserByEmail(email);

    if (!user) {
    console.warn("No hay usuario registrado con el email " + email);
   return res.status(500).send({ success: false, payload: { error: "no se encontro el mail ", msg: "Usuario no encontrado " + email } });

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

    res.json({ success: true,   status: "success", tokenUser } );
  } catch (error) {
    return res.send({ success: false, payload: { status: "error" } });
  }
}

export async function register(req, res) {
  const { first_name, last_name, email, age, password, rol } = req.body;
  try {
    if (!first_name || !email) {
      //Create Custom Error
      CustomError.createError({
          name: "User Creation Error",
          cause: generateUserErrorInfo({ first_name, last_name, age, email }),
          message: "Error tratando de crear el usuario",
          code: EErrors.INVALID_TYPES_ERROR
      });
    }

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

    return res.status(200).send({ success: true, payload: { status: "success", msg: "Usuario creado con éxito" } });
  } catch (error) {
    return res.status(401).send({ success: false, payload: { status: 'error', msg: 'No se puede registrar el usuario' } });
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
