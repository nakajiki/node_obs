/*global require*/

const console = require('console')
const express = require('express')
const mysql = require('mysql')
const terminalLink = require('terminal-link')

// Database
async query(sql) {
    const conn = mysql.createConnection({
        host: process.env.MYSQL_DB_HOST,
        user: process.env.MYSQL_DB_USERNAME,
        password: process.env.MYSQL_DB_PASSWORD,
        port: process.env.MYSQL_DB_PORT,
        database: process.env.APP_NAME
    })

    conn.connect((err) => {
        if (err) {
            console.error('error connectiong: ' + err.stack)
            return null
        }
        console.info('connected as id ' + conn.threadId)
        return conn
    })

    conn.query(sql, (error, rest) => {
        console.log(rest)
        return rest
    })

    conn.end()
}

let sql = 'SELECT * FROM sites'
let sites = query(sql)
console.log(sites)

// Web
const app = express()
const port = 3000
const link = terminalLink('Link:', `http://localhost:${port}`)

app.get('/', (req, res) => res.send(sites))
app.listen(port, () => console.log(`App listening on port ${port}\n${link}`))
