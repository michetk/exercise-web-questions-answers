const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const path = require('path')
const questions = require('./routers/question')
const bodyParser = require('body-parser')
const connection = require('./models/database')
const question = require('./models/Question')


// database
connection
    .authenticate()
    .then(() => {
        console.log('DATABASE SUCCESSFULLY CONNECTED!')
    }).catch((err) => {
        console.log('DATABASE CONNECTION FAILURE!: ' + err)
    })

// body-parser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// path
app.use(express.static(path.join('public')))

// handlebars
app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// rotas
app.use('/questions', questions)

app.get('/', (req, res) => {
    res.render('index')
})

const PORT = 8081
app.listen(PORT, (err) => {
    err ? console.log('SERVER FAILURE!') : console.log('CONECTED SERVER!')
})