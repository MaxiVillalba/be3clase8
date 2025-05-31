import winston from 'winston'

const customLevesOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }

}

// const logger = winston.createLogger({
//     transports: [
//         new winston.transports.Console({
//             level: "http"
//         }),
//         new winston.transports.File({
//             filename:'./errors.log',
//             level: 'warn'
//         })
//     ]
// })
export const logger = winston.createLogger({
    levels: customLevesOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevesOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename:'./errors.log',
            level: 'warning',
            format: winston.format.simple()
        })
    ]
})

export const addLogger = (req, res, next) => {
    req.logger = logger
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}