const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
app.use(express.json())


var corsOptions = {
  origin: "http://localhost:4000"
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))





const db = require("./app/models")
db.sequelize.sync()

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.")
// })



app.get("/", (req, res) => {
  res.json({ message: "Welcome to esparkinfo application." })
})




require("./app/routes/post.routes")(app)


// set port, listen for requests
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})