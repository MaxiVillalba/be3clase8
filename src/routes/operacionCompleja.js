precess.on('message', message => {
    console.log('proceso hijo')
    let result = 0
    for (let i = 0; i < 10e10; i++) {
        result += i        
    }
    process.send(result)
})

