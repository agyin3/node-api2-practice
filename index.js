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

server.post('/api/users', (req,res) => {
    const userInfo = req.body
    console.log(userInfo)
    userInfo.hasOwnProperty('name') && userInfo.hasOwnProperty('bio') ? 
    db.insert(userInfo)
        .then(user => {
            res.status(201).json({success: true, user})
        })
        .catch(err => {
            res.status(500).json({success: false, errorMessage: "There was an error while saving the user to the database" })
        }) :
    res.status(400).json({success: false, errorMessage: "Please provide name and bio for the user."})
})

server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
        .then(user => {
            if(user){
                res.status(200).json({success: true, user})
            }else {
                res.status(404).json({success: false, message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({success: false, errorMessage: "The user information could not be retrieved." })
        })
})

server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
        .then(user => {
            user ? 
            res.status(200).json({success: true, user}) :
            res.status(404).json({success: false, message: "The user with the specified ID does not exist."})
        })
        .catch(err => {
            res.status(500).json({success: false, errorMessage: "The user could not be removed"})
        })
})

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params
    const userInfo = req.body

    userInfo.hasOwnProperty('name') && userInfo.hasOwnProperty('bio') ? 
    db.update(id, userInfo)
        .then(user => {
            user ? 
            res.status(200).json({success: true, user}) :
            res.status(404).json({success: false, message: "The user with the specified ID does not exist."})
        })
        .catch(err => {
            res.status(500).json({success: false, errorMessage: "The user information could not be modified."})
        }) :
    res.status(400).json({success: false, errorMessage: "Please provide name and bio for the user."})
})





