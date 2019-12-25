const express = require('express')

const port = 3000
const server = express()

server
    .use(express.static('.'))
    .use(express.json())
    .use(express.urlencoded({ extended : true }))

server.listen(port, err => console.log(`iamport-kit(vbanks) started on port ${ port }`))