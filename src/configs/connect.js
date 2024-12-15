require('dotenv').config()

var mysql = require('mysql')

var conn = mysql.createConnection({
    host: `${process.env.host}`,
    user: `${process.env.user}`,
    password: `${process.env.password}`,
    port: `${process.env.port}`,
    database: `${process.env.database}`
})

conn.connect(function(err, conn) {
    if(err) {
        console.log("fail")}
        else {
            console.log("seccess")
        }
})
module.exports = conn