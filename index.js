const express = require("express")
const socketIO = require("socket.io")
const ejs = require("ejs")
const http = require('http')
const {fetch} = require('./pg')
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

io.on("connection", async function (client) {

    client.emit('new_connected',await fetch('SELECT user_id, user_username FROM users'))

    client.on("new_user", username => {
        if(
            username === 'ulugbek' ||
             username === 'bobur' ||
             username === 'umar'
        ) {
            client.join('my-chat')
        }
    })
    client.on("new_message", ({username, message}) => {
        if(
            username === 'ulugbek' ||
            username === 'bobur'||
            username === 'umar')
        {
            client.to('my-chat').emit("reciev_message", {username,message})
        }
    })
})

server.listen(PORT,() => `Server ready at ${PORT}`)
