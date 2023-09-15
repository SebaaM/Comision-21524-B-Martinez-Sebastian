// Imports de dependencias
const express = require('express')
const  cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const { sequelize } = require('./database')
const ejs = require ('ejs')
const path = require ('node:path')
const { PostModel } = require('./models/Post')

// Instancia de la app
const app = express()

// seteos de configuracion
app.set('view engine' , 'ejs')
app.set ('views', path.join(__dirname, '/views'))

// Inicio de servidor y conexion a base de datos.
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


// --- IMPORTANTE ---
// /post -> devuelve en Json
// /posts -> Crud templates. 

// Rutas creadas.
app.use('/post', require('./routes/post.routes'))


// plantilla Main
app.get('/', (req, res) => {

    res.render('main')
})

// ruta para ver todos los posts
app.get  ('/posts', async (req, res) => {
    const listaDePosts = await PostModel.findAll()
    res.render('posts', {listaDePosts: listaDePosts.reverse() })
})

// ruta crear, crear middleware para recortar fecha y guardar en BD = fecha_creacion.
app.get('/postForm', (req, res) => {
    

    res.render('postForm')
})

// ruta modificar
app.get('/editarPost/:id', async (req, res) => {
    
    const id = req.params.id

    const post = await PostModel.findByPk(id)

    res.render('editar', { post })
})

// ruta eliminar
app.get('/postElimnar/:id', async (req, res) => {
    var id = req.params.id;

    await PostModel.destroy( {
        where:{
            id:id
        }
    })
    res.redirect('/posts')
})


// middleware de la pagina main.
// function  middlewarePost(req, res , next)  {
//     console.log('Middleware :: ')
//     next()
// }
// app.use(middlewarePost)

