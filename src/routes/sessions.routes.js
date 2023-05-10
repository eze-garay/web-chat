import { Router } from "express";

import { authorization }  from "../utils.js"
import passport from "passport";
const router = Router();



router.get("/github", passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {});

router.get("/githubcallback", passport.authenticate('github', {failureRedirect: '/github/error'}), async (req, res) => {
    const user = req.user;
    req.session.user= {
        name : `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        rol: user.rol
    };
    req.session.admin = true;
    res.redirect("/github");
});

router.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }),
    async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    });


router.get('/private',authorization('admin'), async (req, res) => {
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