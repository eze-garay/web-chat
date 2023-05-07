import passport from "passport";
import passportlocal from "passport-local";
import GitHubStrategy from "passport-github2";
import { UserModel } from "../Dao/DB/models/userModel.js";
import { createHash, isValidPassword } from "../utils.js";


//declarar

const localStrategy = passportlocal.Strategy;

//register

const initializePassaport = () => {

    passport.use('github', new GitHubStrategy (
    {

        clientID: 'Iv1.c3172e5a826a3428',
        clientSecret: 'c38bb806d28ea13f25657a117876106085919319',
        callbackUrl: 'http://localhost:8080/api/sessions/githubcallback'

    },
    async (accessToken, refreshToken, profile, done)=>{
        console.log("Perfil de GitHub")
        console.log(profile)
        try {
            const user = await UserModel.findOne({email: profile._json.email}) ;
            console.log("Usuario encontrado")
            console.log ("User")  
            
        if (!user) {
            console.warn("Usuario no existe en la base de datos"+ profile._json.email);
            let newUser = {
                first_name: profile._json.name,
                last_name: '',
                age: 18,
                email: profile._json.email,
                password: '',
                loggedBy: "GitHub"
            };
            result = await UserModel.create(newUser)
            return done (null, result)
            
        } else {
            return done(null, user)
        }
        } catch (error) {
            return done(error);
        }
    }),
    );

    passport.use('register', new localStrategy(
    
        { passReqToCallback: true, usernameField: 'email' },
        async(req, username, password, done) =>{
            const { first_name, last_name, email, age } = req.body;
            try {

                const exists = await UserModel.findOne({ email });
                if (exists) {
                    console.log("El usuario ya existe.");
                    return done(null, false);
                }
                const user = {
                    first_name,
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
                if (user.email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                    user.isAdmin = true;
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