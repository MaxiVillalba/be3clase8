import cluster from 'node:cluster'
import { cpus } from 'node:os'
import { initServer } from "./src/app.js";

// const numeroDeProcesadores = cpus().length
// console.log(numeroDeProcesadores)

// console.log('is primary: ', cluster.isPrimary)

// un processo primario server primary
// crear muchos workers -> procesos hijos (copias del pirmario)

// if (cluster.isPrimary) {
//     console.log('Proceso primario, generando un proceso worker')
//     for (let i = 0; i < numeroDeProcesadores; i++) {
//         cluster.fork()       
    
//     }
//     // cluster.on('message', worker =>)
// } else {
//     console.log('Al ser un proceso forkeado, no cuento como pirmario, isPrimary=false. Entonces soy un worker');
//     console.log(`Soy un worker con el pid: ${process.pid}`);
    initServer()
// }