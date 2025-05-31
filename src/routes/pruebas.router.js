import { Router } from 'express';
import { fork } from 'node:child_process'
import { faker } from '@faker-js/faker'
import compression from 'express-compression';


const router = Router()



router.get('/usermock', (req, res) => {
    const user = {}
    user.first_name = faker.person.firstName()
    user.last_name = faker.person.lastName()
    user.email = faker.internet.email()
    user.password = faker.internet.password()

    res.send(user)
})
router.get('/sencilla', (req, res) => {
    let suma = 0
    for (let i = 0; i < 1000000; i++) {
        suma += i
        
    }
    res.send({suma})
})
router.get('/compleja', (req, res) => {
    let suma = 0
    for (let i = 0; i < 7e8; i++) {
        suma += i        
    }
    res.send({suma})
})

// artillery quick --count 40 --num 50 "http://localhost:8080/pruebas/sencilla" -o simple.json
// artillery quick --count 40 --num 50 "http://localhost:8080/pruebas/compleja" -o compleja.json
// artillery run config.yaml --output testPerformance.json
// artillery report testPerformance.json -o testResult.html

// router.get('/logger', (req, res) => {
//     req.logger.fatal('Esto es un error')
//     req.logger.error('esto es un warnig')
//     req.logger.warning('esto es un warnig')
//     res.send('logger')
// })



export default router;

// js  single thread