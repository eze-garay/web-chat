import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt"



const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)



// hASh

export const createHash = paswoord => bcrypt.hashSync(paswoord, bcrypt.genSaltSync(10))

//validar

export const isValidPassword = (user, password )=>{
   console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
   return bcrypt.compareSync(password, user.password)
}



export default __dirname;