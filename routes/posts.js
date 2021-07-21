const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('post')
})

router.get('/edit', (req, res) => {
    res.render('edit')
})



module.exports = router