
import {UserModel} from "../Dao/DB/models/userModel.js"


export async function createUser (data){
    try {
        const response = await UserModel.create(data);
        return response
    } catch (error) {
        throw new Error (error)
    }
}

export async function getUser (){
    try {
        let response = await UserModel.find()
        return response
    } catch (error) {
        console.error("No se pudo obtener usuarios con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener usuarios con moongose", message: error});
    }
}

export async function get(){
    try {
        let user = await UserModel.findOne();
        return user
    } catch (error) {
        console.error("No se pudo obtener usuarios con moongose: " + error);
        res.status(401).send({error: "No se pudo obtener usuarios con moongose", message: error});
    }
}

export async function auth (req, res, next) {
  if(req.session.admin) {
   return next();
 }else{
  return res.status(401).send({error: "No se pudo ingresar", message: error});
 }
};

