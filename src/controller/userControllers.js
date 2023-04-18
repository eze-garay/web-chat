
import * as UserServices from "../services/userServices.js"


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