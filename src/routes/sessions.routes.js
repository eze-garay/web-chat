import { Router } from "express";
import { UserModel } from "../Dao/DB/models/userModel.js";
import { generateJWToken }  from "../utils.js"
import { authToken } from "../utils.js"
import passport from "passport";
const router = Router();



router.get("/github", passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {});

router.get("/githubcallback", passport.authenticate('github', {failureRedirect: '/github/error'}), async (req, res) => {
    const user = req.user;
    req.session.user= {
        name : `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/github");
});



router.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }),
    async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    });


    router.post("/login", async (req, res, next) => {
      const userCheck = await UserModel.findOne ({email: req.body.email})
      if (!userCheck) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
      next();
    }, passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
      console.log("User found to login:");
      const user = req.user;
      req.admin = (user.email === 'adminCoder@coder.com' )
      req.session.user = {
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          age: user.age
      }
      const access_token = generateJWToken(user);
      console.log(access_token)
      const responseObj = {
        access_token: access_token,
        payload: req.session.user,
        message: "¡Primer logueo realizado! :)"
      };
      res.status(201).send({ status: "success", ...responseObj });
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

router.get('/private', authToken , async (req, res) => {
  res.render('profile');

});


router.get('/fail-register', (req, res) => {
  // Mostrar una alerta de SweetAlert si se ingresaron datos incorrectos
  Swal.fire({
    icon: 'error',
    title: 'Error de inicio de sesión',
    text: 'Los datos ingresados son incorrectos. Por favor, inténtelo de nuevo.'
  }).then(() => {
    // Redirigir de vuelta a la página de inicio de sesión
    res.redirect('/register');
  });
});

router.get('/fail-login', (req, res) => {
  // Mostrar una alerta de SweetAlert si se ingresaron datos incorrectos
  Swal.fire({
    icon: 'error',
    title: 'Error de inicio de sesión',
    text: 'Los datos ingresados son incorrectos. Por favor, inténtelo de nuevo.'
  }).then(() => {
    // Redirigir de vuelta a la página de inicio de sesión
    res.redirect('/login');
  });
});





export default router;