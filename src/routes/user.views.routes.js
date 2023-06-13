import { Router } from "express";
import { passportCall, authorization} from "../utils.js";


const router = Router();

router.get('/login', (req,res)=> {
    res.render("login");
})

router.get('/register', (req,res)=> {
    res.render("register");
})

// router.get('/logout', (req, res)=>{
//     req.session.destroy(error => {
//         if(error){
//             res.json({error: "Error de logout", msg: 'Error al cerrar session'})
//         }
//         res.clearCookie('connect.sid').redirect('login')  
//     })  
// })
router.get('/logout', (req, res) => {
    res.cookie('jwtCookieToken', '', { expires: new Date(0), httpOnly: true });
    res.redirect('login'); 
});

router.get('/private',
    
    passportCall('jwt'),
    authorization(''),    
    (req, res) =>{
    res.render('profile', {user: req.user})

})

router.get("*", (req, res) => {
    res.status(404).send("Cannot get that URL!!")
});




export default router;