import passport from "passport";
import passportlocal from "passport-local";
import GitHubStrategy from "passport-github2";
import { UserModel } from "../Dao/DB/models/userModel.js";
import { PRIVATE_KEY, createHash } from "../utils.js";
import jwtStrategy from 'passport-jwt';




const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;
const localStrategy = passportlocal.Strategy;


//declarar


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
                age: '',
                email: profile._json.email,
                password: '',
                loggedBy: "GitHub",
            };

            let result = await UserModel.create(newUser);
            return done (null, result)
            
        } else {
            return done(null, user);
        }
        } catch (error) {
            return done(error);
        }
    }),
    );

    passport.use('register', new localStrategy(
    
        { passReqToCallback: true, usernameField: 'email' },
        async(req, username, password, done) =>{
            const { first_name, last_name, email, age, rol } = req.body;
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
                    password: createHash (password),
                    rol,
                    
                };
                const result = await UserModel.create(user);
                return done(null, result);
            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }
        }

    ))
 // estrategia login

    passport.use('jwt', new JwtStrategy (
     
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: PRIVATE_KEY,
        },async (jwt_playload, done)=>{
            console.log("Entrando a passport con JWT")
            try {
                console.log("JWT obtenido del payload")
                console.log(jwt_playload);
                return done (null, jwt_playload.user)
            } catch (error) {
                console.log(error);
                return done (error);
            }

        }
    
    ));

        
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

const cookieExtractor = req =>{
    let token = null;
    console.log("Entrando a cookieExtract")
    if (req && req.cookies) {
        console.log("Cookies presentes");
        console.log(req.cookies);
        token = req.cookies['jwtCookieToken'];
        console.log("Token desde cookie");
        console.log(token);
    }
    return token;
}

export default initializePassaport;