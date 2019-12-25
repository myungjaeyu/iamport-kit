const express = require('express')
const request = require('request')

const port = 3000
const server = express()

const domain = 'https://api.iamport.kr'

const access_token = ''

const data = (uri, form = {}) => ({
    json: true,
    auth: {
        bearer: access_token
    },
    url: domain + uri,
    form
})

server
    .use(express.static('.'))
    .use(express.json())
    .use(express.urlencoded({ extended : true }))
    .post('/', (req, res) => {

        const { merchant_uid, amount, vbank_code, vbank_due, vbank_holder } = req.body /* required */
        const { name, buyer_name, buyer_email, buyer_tel, buyer_addr, buyer_postcode } = req.body

        const uri = '/vbanks'

        const form = { 
            merchant_uid,
            amount,
            vbank_code,
            vbank_due,
            vbank_holder
        }

        request.post(data(uri, form) , (_, __, { response }) => res.json({ response }))

    })
    .put('/:imp_uid', (req, res) => {

        const { imp_uid } = req.params
        const { amount, vbank_due } = req.body

        const uri = `/vbanks/${ imp_uid }`

        const form = { 
            amount,
            vbank_due
        }

        request.put(data(uri, form) , (_, __, { response }) => res.json({ response }))

    })
    .delete('/:imp_uid', (req, res) => {

        const { imp_uid } = req.params

        const uri = `/vbanks/${ imp_uid }`

        request.delete(data(uri) , (_, __, { response }) => res.json({ response }))

    })
    .get('/holder', (req, res) => {

        const { bank_code, bank_num } = req.query

        const uri = `/vbanks/holder?bank_code=${ bank_code }&bank_num=${ bank_num }`

        request.get(data(uri), (_, __, { response }) => res.json({ response }))

    })

server.listen(port, err => console.log(`iamport-kit(vbanks) started on port ${ port }`))