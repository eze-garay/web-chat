import  * as CartsServices from "../services/cartsServices.js"



export async function create (req,res){
    try {
        let prod = await CartsServices.addCart()
        if (prod) {
            return res.json({
                message: 'Carrito creado con éxito',
              });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
}


export async function getCart (req,res) {
    let pid = req.params.cid
    
    try {
        let one = await CartsServices.getCartById((pid))
        if (one) {
            return res.status(200).send(one)
        } else {
            return res.status(404).send({error: 'Carrito no econtrado'})
        } 
    } catch (error) {
        return res.status(500).send(error.message)
    }
}



export async function addProduct (req,res) {

      try {
          let cart = await CartsServices.addToCart()
          if (!cart) {
              return res.status(404).send('no se puede encontrar el carrito')
          }
          return res.status(200).send(cart)
      } catch(error) {
          return res.status(500).send(error.message)
      }
}

