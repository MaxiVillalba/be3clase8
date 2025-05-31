import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import usersRouter from './routes/users.router.js'
import petsRouter from './routes/pets.router.js'
import adoptionsRouter from './routes/adoption.router.js'
import sessionsRouter from './routes/sessions.router.js'
import pruebasRouter from './routes/pruebas.router.js'
import { configObject } from './config/index.js'
import { handleError } from './utils/error/error.middleware.js'

import { addLogger, logger } from './config/logger.js'
import { title } from 'process'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
mongoose.connect(process.env.MONGO_URL)
const PORT = configObject.port 


app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(addLogger)
app.disable('x-powered-by')

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documumentación de app de adoptame',
            description: 'Api pensadaa para app de mascotas'
        }
    },
    apis: [`./src/docs/**/*.yaml`]

}

const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use('/pruebas', pruebasRouter)
app.use('/api/users',usersRouter)
app.use('/api/pets',petsRouter)
app.use('/api/adoptions',adoptionsRouter)
app.use('/api/sessions',sessionsRouter)
app.use(handleError)


export const initServer = async () => {
    return await app.listen(PORT,()=> logger.info(`Listening on ${PORT}`))
}





// process -> objeto