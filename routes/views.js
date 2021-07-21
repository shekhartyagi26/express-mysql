const express = require('express')
const { route } = require('./posts')
const router = express.Router()

router.get('/compose', (req, res) => {
    res.render('compose')
})

router.get('/', (req, res) => {
    res.render('edit')
})

router.get('/login', (req, res) => {
    
    
})

router.get('/signup', (req, res) => {
    console.log("signnup")
})

module.exports = router