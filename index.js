const db = require('./data/db.js')
const express = require('express')

const server = express()

server.listen(5000, () => {
    console.log('*******Server is listening on port 5000*******')
})

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Epstein did not kill himself')
})

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({success: false, errorMessage: "The users information could not be retrieved."})
        })
})