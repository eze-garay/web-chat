import winston from "winston";


const loggerA = winston.createLogger({
    transports: [
        new winston.transports.Console({level: "http"}),
        new winston.transports.File({ filename: './errors.log', level: 'warn' }),


    ]
});

export const addLoggerA = (req,res,next) => {
    req.logger = loggerA;
    req.logger.warn("Prueba de log level warning!")
    req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    next();
};


