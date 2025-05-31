import dotenv from 'dotenv'
// import { program } from '../../../process.js'

// const { mode } = program.opts()

dotenv.config()

// dotenv.config({
//     path: mode === 'production' ? './.env.production' : './.env.development'
// })
// console.log(process.env.PORT)
export const configObject = {
    port : process.env.PORT || 8080
}