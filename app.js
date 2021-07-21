const express = require('express')
const https = require('https')
const ejs = require('ejs')
const _ = require('lodash')
const fs = require('fs')
const postsRoutes = require('./routes/posts')
const viewRoutes = require('./routes/views')
const methodOverride = require('method-override')
const mysql = require('mysql')
const dotenv = require('dotenv')

const bodyParser = require('body-parser');

dotenv.config({ path: './models/.env'})

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
})

const app = express()

app.set('view engine', 'ejs')
// app.use(express.bodyParser())
app.use(express.json())


app.post('/login', (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
    db.connect((err) => {
        if(err) {
            console.log(err)
        } else {
            console.log("Connected")


            var sql = "INSERT INTO users (username, password) VALUES ('" + req.body.username + "', '" + req.body.password + "')"
            db.query(sql, (err, result) => {
                if (err) throw err
                console.log("Record entered")
            })
        }
    })
})

//app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
    res.render('home')
})


app.use('/', viewRoutes)
app.use('/posts', postsRoutes)

const port = process.env.PORT || 4000
app.listen(port, function() {
    console.log(`Listening on port ${port} ...`)
})