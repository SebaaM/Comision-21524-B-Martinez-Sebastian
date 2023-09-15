// Imports
const express = require('express')
const  cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./database')
const ejs = require ('ejs')
const path = require ('node:path')
const { PostModel } = require('./models/Post')
const { verPosts } = require('./controllers/post.controller')

const app = express()
app.set('view engine' , 'ejs')
app.set ('views', path.join(__dirname, '/views'))
app.use(express.static(__dirname + '/public'))

// Inicio de aplicacion.
app.listen (3000, () => {
    sequelize.sync({ force: false })
       // force: true  borra la BD y la crea de nuevo, se pierden los registros.
    .then(() => {
        console.log("Base de datos conectada")
    })
    .catch ((err)=> {
        console.error(err)
    })

    console.log('Servidor corriendo en el puerto 3000')
})


app.use(express.static(__dirname + '/public'))

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded( {extende:false}))

// Rutas creadas.
app.use('/post', require('./routes/post.routes'))


// plantilla Main
app.get('/', (req, res) => {

    res.render('main')
})

app.get  ('/posts', async (req, res) => {
    const listaDePosts = await PostModel.findAll()
    res.render('posts', {listaDePosts: listaDePosts.reverse() })
})

app.get('/postForm', (req, res) => {
    
    res.render('postForm')
})

// middleware de la pagina main.
function  middlewarePost(req, res , next)  {
    console.log('Middleware :: ')
    next()
}

app.use(middlewarePost)

