import dotenv from 'dotenv';
import { Command } from 'commander';


const program = new Command(); //Crea la instancia de comandos de commander.

program
    .option('-d', 'Variable para debug', false)
    .option('--persist <mode>', 'Modo de persistencia', "mongodb")
    .option('--mode <mode>', 'Modo de trabajo', 'dev')
program.parse();

//console.log("Options: ", program.opts());
console.log("Environment Mode Option: ", program.opts().mode);
console.log("Persistence Mode Option: ", program.opts().persist);

const environment = program.opts().mode;




// console.log(process.env.ADMIN_NAME);

//  const environment = "development";

dotenv.config({
        path: environment === "production" ? "./src/config/.env.production" : "./src/config/.env.development"
});



export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    persistence: program.opts().persist,
    adminPassword: process.env.ADMIN_PASSWORD
};