
import { Router } from 'express';
const router = Router();

const Regex = /^[0-9a-fA-F]{24}$/;

//Home

router.get('/', async (req, res)=> {
  try {
    res.render("login");
  } catch (error) {
    throw Error (error);
  }
});

router.get('/home', async (req, res)=> {
  try {
    res.render("home");
  } catch (error) {
    throw Error (error);
  }
});




//Chat
router.get('/message', async (req, res) =>{
    res.render('message');
})
//Session

router.get('/session', (req, res)=>{
  if(req.session.counter){
      req.session.counter++;
      res.send(`Se ha visitado este sitio ${req.session.counter} veces` )
  }else{
      req.session.counter = 1;
      res.send("Bienvenide")
  }
})


// En caso de pasar datos filtrar antes
// router.param("_id", async (req, res, next, ) => {
//   console.log("Buscando nombre de mascota con valor");
//   try {
//       let result = await CartsModel.findById({_id: req.params._id});
//       if (!result) {
//           req.cart = null;
//       } else {
//           req.cart = result;
//       }
//       next();
//   } catch (error) {
//       console.error("Error consultando las mascotas");
//       res.status(500).send({ error: "Error consultando las mascotas", message: error });
//   }
// });

  
export default router;