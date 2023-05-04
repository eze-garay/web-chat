import passport from "passport";
import passportlocal from "passport-local";
import { UserModel } from "../Dao/DB/models/userModel.js";
import { createHash, isValidPassword } from "../utils.js";


//declarar

const localStrategy = passportlocal.Strategy;

//register

const initializePassaport = () => {
    passport.use('register', new localStrategy(
    
        { passReqToCallback: true, usernameField: 'email' },
        async(req, username, password, done) =>{
            const { name, last_name, email, age } = req.body;
            try {

                const exists = await UserModel.findOne({ email });
                if (exists) {
                    console.log("El usuario ya existe.");
                    return done(null, false);
                }
                const user = {
                    name,
                    last_name,
                    age,
                    email,
                    password: createHash (password)
                    
                };
                const result = await UserModel.create(user);
                return done(null, result);
            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }
        }

    ))
            // estrategia login
    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            try {
                const user = await UserModel.findOne({ email: username });
                console.log("Usuario encontrado para login:");
                console.log(user);
                if (!user) {
                    console.warn("User doesn't exists with username: " + username);
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    console.warn("Invalid credentials for user: " + username);
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );

        
    
    //"cifrar" usuario

        passport.serializeUser((user, done) => {
            done(null, user._id);
        });
    
        passport.deserializeUser(async (id, done) => {
            try {
                let user = await UserModel.findById(id);
                done(null, user);
            } catch (error) {
                console.error("Error deserializando el usuario: " + error);
            }
        });
    }

export default initializePassaport;