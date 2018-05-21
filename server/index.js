require('dotenv').config()
const express= require('express'),
        bodyParser= require('body-parser'),
        massive= require('massive'),
        controller= require('./controller')


const app= express()
app.use(bodyParser.json())

const {SERVER_PORT, CONNECTION_STRING}=process.env

massive(CONNECTION_STRING).then(db=>app.set('db', db))

app.listen(SERVER_PORT, console.log(`Flying high on port ${SERVER_PORT} 🛩  🏖`))