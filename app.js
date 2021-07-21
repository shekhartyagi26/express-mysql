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


dotenv.config({ path: './models/.env' })

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
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
    res.render('home')
})


app.use('/', viewRoutes)
app.use('/posts', postsRoutes)

const port = process.env.PORT || 4000



app.post('/login', (req, res) => {
    let { username, password } = req.body;
    console.log(req.body)

    if (username, password) {
        db.connect((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Connected")

                var sql = "INSERT INTO users (username, password) VALUES ('" + username + "', '" + password + "')"
                db.query(sql, (err, result) => {
                    if (err) throw err
                    console.log("Record entered")
                })
            }
        })
    } else {
        res.status(400).json({ message: "Something went wrong" })
    }
})
app.listen(port, function () {
    console.log(`Listening on port ${port} ...`)
})