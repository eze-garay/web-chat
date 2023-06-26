
import config from "./config.js";
import winston, {transports} from "winston";

const customLevelsOptions = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
      },
      colors: {
        debug: "white",
        http: "cyan",
        info: "green",
        warning: "yellow",
        error: "red",
        fatal: "magenta"
      }
};

//Custom Logger:
const devLogger = winston.createLogger({
    //Levels:
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console(
            {
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelsOptions.colors}),
                    winston.format.simple()
                )
            }
        ),
        // new winston.transports.File(
        //     {
        //         filename: './errors.log', 
        //         level: 'warning', //Cambiamos el logger level name.
        //         format: winston.format.simple()
        //     }
        // )
    ]
});

//Creating our logger:
const prodLogger = winston.createLogger({
    //Declare transports:
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({level: "info",
        format: winston.format.combine(
            winston.format.colorize({colors: customLevelsOptions.colors}),
            winston.format.simple()
        )}),
        new winston.transports.File(
            {
                        filename: './errors.log', 
                        level: 'error', //Cambiamos el logger level name.
                        format: winston.format.simple()
                    
        })
    ]
});

//Declare a middleware:
export const addLoggerB = (req, res, next) => {
    if (config.environment === 'production'){
        req.logger = prodLogger;
    } else {
        req.logger = devLogger;
    }
    req.logger.debug("Debug message"); // Log de nivel debug
    req.logger.http("HTTP message"); // Log de nivel http
    req.logger.warning("Warning message"); // Log de nivel warning
    req.logger.error("Error message"); // Log de nivel error
    req.logger.fatal("Fatal message"); // Log de nivel fatal
    req.logger.info(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    next();
};