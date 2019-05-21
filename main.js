/*global require*/

let process = require('process')
let mysql = require('mysql')

let host = process.env.MYSQL_HOST
let port = process.env.MYSQL_PORT
let user = process.env.MYSQL_USER
let password = process.env.MYSQL_USER

let conn = mysql.createConnection({
    host: host,
    port: port,
    user: user,
    password: password
})

conn.connect()
