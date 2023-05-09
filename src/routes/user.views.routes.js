import { Router } from "express";
import { passportCall, authorization } from "../utils.js";


const router = Router();

router.get('/login', (req,res)=> {
    res.render("login");
})

router.get('/register', (req,res)=> {
    res.render("register");
})


router.get('/logout', (req, res)=>{
    req.session.destroy(error => {
        if(error){
            res.json({error: "Error de logout", msg: 'Error al cerrar session'})
        }
        res.clearCookie('connect.sid').redirect('login')
        
    })
    
})

router.get('/private',
    
    passportCall('jwt'),
    authorization('admin'),    
    (req, res) =>{
    res.render('profile', {user: req.user})

})




export default router;