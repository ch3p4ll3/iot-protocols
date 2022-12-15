const coap = require('coap')

// the default CoAP port is 5683
const req = coap.request('coap://localhost/hello')

req.on('response', (res) => {
    res.pipe(process.stdout)
    res.on('end', () => {
        process.exit(0)
    })
})

req.end()