const express = require('express')
const request = require('request')

const port = 3000
const server = express()

const key = {
    imp_key: '',
    imp_secret: ''
}

server
    .use(express.static('.'))
    .use(express.json())
    .use(express.urlencoded({ extended : true }))  
    .get('/authenticate', (req, res) => {

        const data = { 
            json: true, 
            url: 'https://api.iamport.kr/users/getToken',
            form: { 
                ...key 
            }
        }

        request.post(data , (_, __, { response: { access_token } }) => res.json({ access_token }))

    })
    .get('/payments/:imp_uid', (req, res) => {

        const { imp_uid } = req.params

        const data = {
            json: true,
            url: `https://api.iamport.kr/payments/${ imp_uid }`,
            auth: {
                bearer: '' /* accessToken */
            }
        }

        request.get(data, (_, __, { response }) => res.json({ response }))

    })

server.listen(port, err => console.log(`iamport-kit started on port ${ port }`))