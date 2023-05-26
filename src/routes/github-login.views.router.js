import { Router } from "express";



const router = Router();

router.get('/login', (req, res )=>{
    res.render('github-login')
})

router.get('/', (req, res )=>{
    res.redirect('/api/products/')
})

router.get('/error', (req, res )=>{
    res.render("error", {error: "No se pudo autenticar usando GitHub!"});
})

export default router;