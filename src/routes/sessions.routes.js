import { Router } from "express";
import { UserModel } from "../Dao/DB/models/userModel.js";
import { auth } from "../services/userServices.js";
import passport from "passport";
const router = Router();


router.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }),
    async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    });




router.post("/login", passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
  console.log("User found to login:");
  const user = req.user;
  console.log(user);
  
  if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
  req.session.user = {
      name: `${user.name} ${user.last_name}`,
      email: user.email,
      age: user.age
  }
  res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
});


// router.post("/login", passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
//   console.log("User found to login:");
//   const user = req.user;
//   console.log(user);
  
//   if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });

//   // Verificar si el usuario es un administrador
//   let isAdmin = false;
//   if (user.email === 'adminCoder@coder.com' && req.body.password === 'adminCod3r123') {
//     isAdmin = true;
//   }

//   if (isAdmin) {
//     req.session.admin = true;
//     return res.send('Inicio sesión como administrador').status(200);
//   } else {
//     req.session.user = {
//       name: `${user.name} ${user.last_name}`,
//       email: user.email,
//       age: user.age
//     };
//     res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
//   }
// });



router.get('/private', auth , async (req, res) => {

    const users = await UserModel.find()

    return res.render('users', {users}).send({status: 'ok', msg:'Lista de usuarios'});

});
router.get("/fail-register", (req, res) => {
  res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
  res.status(401).send({ error: "Failed to process login!" });
});






export default router;