import { UserModel } from "../Dao/DB/models/userModel.js";
import userDto from "../dto/user.dto.js"

export async function findUserByEmail (email) {
    try {
      const user = await UserModel.findOne({ email: email });
      return user;
    } catch (error) {
        res.status(500).send({error: "No se pudo encontrar usuario", message: error});
    }
};

  
export async function createUser (data){
    try {
       let user = new userDto(data)
        const response = await UserModel.create(user);
        return response
    } catch (error) {
        res.status(500).send({error: "No se pudo crear usuario", message: error});
    }
    }


export async function getUser (){
    try {
        let response = await UserModel.find()
        return response
    } catch (error) {
        res.status(500).send({error: "No se pudo obtener usuarios con moongose", message: error});
    }
}

export async function get(){
    try {
        let user = await UserModel.findOne();
        return user
    } catch (error) {
        res.status(500).send({error: "No se pudo obtener usuarios con moongose", message: error});
    }
}

// export async function auth (req, res, next) {
//   if(req.session.admin) {
//    return next();
//  }else{
//   return res.status(401).send({error: "No se pudo ingresar", message: error});
//  }
// };
