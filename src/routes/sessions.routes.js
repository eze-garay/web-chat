import { Router } from "express";
import { UserModel } from "../Dao/DB/models/userModel.js";
import { auth } from "../services/userServices.js";
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
    password,
    
 }

 const result = await UserModel.create(user);
 res.status(200).send({status: "success", msg: "Usuario creado con exito"+ result.id})

})


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });
  
    if (user) {
      req.session.user = {
        name: `${user.name} ${user.last_name}`,
        email: user.email,
        age: user.age,
      };
      res.send({ user: req.session.user });
    } else if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      req.session.admin = true;
      res.send('Inicio sesión como administrador');
    } else {
      return res.status(401).send({ status: 'error', msg: 'Usuario o Password incorrectos' });
    }
});


router.get('/private', auth , async (req, res) => {

    const users = await UserModel.find()

    return res.render('users', {users}).send({status: 'ok', msg:'Lista de usuarios'});

});






export default router;