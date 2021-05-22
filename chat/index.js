const express = require("express")
const socketIO = require("socket.io")
const ejs = require("ejs")
const http = require('http')
const app = express()
const server = http.Server(app)
const io = socketIO(server)
const PORT = process.env.PORT || 4000

app.engine("html", ejs.renderFile)
app.set("view engine", "html")
app.use(express.static("static"))

app.get("/", (_, res) => {
    res.render("main")
})

io.on("connection", (socket) => {
    console.log( 'New connection ',socket.id)
})

server.listen(PORT,() => `Server ready at ${PORT}`)
