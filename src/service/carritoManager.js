import fs from 'node:fs'


class cartManager {
    
  
   
  constructor() {
        this.carts = []
        this.productDir = "./src/file";
        this.path = this.productDir + "/carrito.json";     
    
    }
    
    addCart = async (id) => {   
      await fs.promises.mkdir(this.productDir,{recursive: true})        
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, "[]");
      }
      let Cart = {
        id,
        products: []
      }
      try {
        let cartsFile = await fs.promises.readFile(this.path, "utf-8");
        this.carts = JSON.parse(cartsFile)
        if (this.carts.length>0) {
          Cart.id = this.carts[this.carts.length-1].id+1
        } else {
          Cart.id = 1
        }
        
        this.carts.push(Cart)
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2)) 
        console.log(Cart)
        return 'carrito cargado'
        
      } catch (error) {
        throw Error (`No se puede encontrar el producto, verifique  ${this.productDir}, detalle del error ${error}`);
    }
  }
    getCartById = async (id) => {
    try {
      await fs.promises.mkdir(this.productDir,{recursive: true})
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, "[]");
      }
      let cartsFile = await fs.promises.readFile(this.path, "utf-8");
      this.carts = JSON.parse(cartsFile)
  
    let founded = this.carts.find(prod => prod.id === id)
    if (founded){
      console.log(founded)
      return founded
    } else {
      return 'El carrito no esta en la lista'
    } } catch (error) {
  throw Error (`No se puede encontrar el carrito, verifique  ${this.productDir}, detalle del error ${error}`);
  }
  }


  addProductToCart = async (cId,pId) => {
    try {
      let cart = await this.getCartById(cId)
      if (!cart) {
          return 'carito no encontrado'
      }
      let product = cart.products.map(prod=>prod.id).indexOf(pId)
      if (product>=0) {
          cart.products[product].quantity++
      } else {
          cart.products.push({
              id: pId,
              quantity: 1
          })
      }
      this.carts.map(cart => cart.id===cId ? cart : cart )
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2))
      return 'producto añadido'
  } catch(err) {
      console.log(err.stack)
      return { error: err.message }
  }


  }



    
};




let carts = new cartManager ();

export default carts