const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')

const index = require('./routes/index')

const port = process.env.PORT || 3000

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index)

app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})

