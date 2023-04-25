import express from 'express'
import bodyParser from 'body-parser'
import connection  from './database/db.js'

//lib express
const app = express()

//view engine
app.set('view engine', 'ejs')

//static
app.use(express.static('public'))

//body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//database
connection.authenticate().then(() => console.log('Success connection!')
).catch((error) => console.log(error))

//render ejs pela rota
app.get('/', (req, res) => {
    res.render('index')
})

app.listen(8080, () => {
    console.log('O servidor está rodando!');
})