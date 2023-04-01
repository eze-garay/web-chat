
import fs from 'node:fs'


class productManager {
    
  
   
    constructor() {
        this.products = [];
        this.productDir = "src/file";
        this.path = this.productDir + "/products.json"; 
      
                
    
    }

    async createProductFileIfNotExists() {
      await fs.promises.mkdir(this.productDir, { recursive: true })
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, "[]");
      }
      let productsFile = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(productsFile);
    }
    
    addProduct = async ({title,description,price,code,stock,status,thumbnail}) => {   
      let product = {title,description,price,code,stock,status,thumbnail}
    await this.createProductFileIfNotExists();
    if (this.products.length>0) {
      product.id = this.products[this.products.length-1].id+1
    } else {
      product.id = 1
    }
      try {
        if (! this.products.find((prod) => prod.code == code)) {
        this.products.push(product)
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2)) 
        let message = 'producto  creado'
        return { message }
        }
          let message = 'El elemento ya esta cargado'
          return { message }
        } catch (error) {
          console.log(error.message)
          return { error: error.message }
      }
    }



    getProduct = async () =>{
      try {
      let productFile = await fs.promises.readFile(this.path, "utf-8");
      console.info("Archivo JSON obtenido desde archivo: ");
      console.log(productFile);
      const productsParsed=JSON.parse(productFile);
      console.log("Productos encontrados: ");
      console.log(productsParsed);
      return productsParsed;
      } catch (error) {
        throw Error (`Error al consultar la lista de productos, verifique el archivo ${this.productDir}, detalle del error ${error}`);
      }
    }


    getProductById = async (id) =>{
      try {
      await this.createProductFileIfNotExists();
      let founded = this.products.find(prod => prod.id === id)
      if (founded){
        console.log(founded)
        return founded
      } else {
        return 'El producto no esta en la lista'
      } } catch (error) {
    throw Error (`No se puede encontrar el producto, verifique  ${this.productDir}, detalle del error ${error}`);
    }
    }


    updateProductById = async (id, updatedData) => {
      try {
        let result = await fs.promises.readFile(this.path)
        let parsedRes = await JSON.parse(result)
        
        let productToUpdate = parsedRes.find(product => product.id == id)
        
        if (productToUpdate) {
        // actualizar el objeto
        Object.assign(productToUpdate, updatedData)
        
        await fs.promises.writeFile(this.path, JSON.stringify(parsedRes))
        return { status: 200, response: 'modificado' }
      } 
      } catch (error) {
        console.log(error)
        return { status: 400, response: 'error' }
      }
      }
     
  
 
    deleteProduct = async (id) => {
      try {
        const productFile = await fs.promises.readFile(this.path, "utf-8")
        const productsParsed = JSON.parse(productFile);
        const productFounded = await productsParsed.find(product => product.id === id )
  
        if (productFounded) {
          console.log(productsParsed.indexOf(productFounded))
          productsParsed.splice(productsParsed.indexOf(productFounded), 1)
          await fs.promises.unlink(this.path)
          await fs.promises.writeFile(this.path, JSON.stringify(productsParsed))
        }
        return { status: 200, response: 'eliminado' }
        
      } catch (error) {
        console.log(error)
        return { status: 400, response: 'error' }
      }
  
    
    
    }
};



let manager = new productManager ();

export default manager
