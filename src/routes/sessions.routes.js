import { Router } from "express";
import { UserModel } from "../Dao/DB/models/userModel.js";

const router = Router();

router.post('/register', async (req,res)=> {
    const {name, last_name, age ,email , password} = req.body;
    console.log("Usuario Registrado");
    console.log(req.body);


 const exists = await UserModel.findOne({email});
 if (exists) {
    return res.status(400).send({status:"error", msg: "El email ya esta en uso"})
 }
 const user = {
    name,
    last_name,
    age,
    email,
    password
 }

 const result = await UserModel.create(user);
 res.status(201).send({status: "success", msg: "Usuario creado con exito"+ result.id})

})

router.post('/login', async (req,res)=>{
    const {email, password}= req.body;
    const user = await UserModel.findOne({email, password});

    if (!user) {
        return res.status(401).send({status: "error", msg:"Usuario o Password incorrectos"})
    }

    req.session.user= {
        name : `${user.name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    res.send({status:"success", payload:req.session.user, message:"Se ha logueado con exito" });
})





export default router;