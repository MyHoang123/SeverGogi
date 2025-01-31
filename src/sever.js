require('dotenv').config()
const express = require('express')
const apiroute = require('./routes/apiindex')
const db = require('./configs/connect')
const path = require('path');
const http = require('http');
const SocketService = require('./services/index');
const app = express()
const server = http.createServer(app);
// Server-side
app.use(express.urlencoded())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
// connect database
db.conn;
// // apiRoutes
apiroute(app)
// Websocket
SocketService(server)
server.listen(process.env.PORT_SEVER, () => {
console.log(`Example app listening on port ${process.env.port}`)
})