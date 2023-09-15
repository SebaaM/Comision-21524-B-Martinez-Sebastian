

const { PostModel } = require('../models/Post')

// CRUD del modelo post


// Devuelve todos los post creados.
const verPosts = async (req, res) => {
    try {
        const todos_posts = await PostModel.findAll()
    
        res.status(200).json(todos_posts)
    } catch (error) {
        //res.status(500)
        console.error(error)
    }
}


// Devuelve el post del id. 
const verPostPorId = async (req, res) => {

    try {
        const post = await PostModel.findByPk(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).send('Erorr al ver la post.')
        console.log(error)
    }
}

// Nuevo post
const crearPost = async (req, res) => {
    

    try {
            const { titulo, contenido, link_imagen, autor } = req.body
            const fecha_creacion = Date.now()
            await PostModel.create ({ titulo, contenido, link_imagen, fecha_creacion, autor })
        
            res.status(201).redirect("posts")
    } catch (error) {
        res.status(500).send('Erorr al crear la post.')
        console.log(error)
    }
}


// Modificacion de un post ya creado.
const editarPost = async (req, res) => {

    try {
            const id = req.params.id
            const { titulo, contenido, link_imagen, autor } = req.body
        
            await PostModel.update({ titulo, contenido, link_imagen, autor  } , {
                where: {
                    id:id
                }
            })
        
            res.status(202).redirect('/posts')
    } catch (error) {
        res.status(500).send('Erorr al modificar la post.')
        console.log(error)
    }
}


// Elimina el registro de la base de datos.
const eliminarPost = async (req, res) => {
 
    // hacer el borrado logico con la variable :activo:
    try {
        const id = req.params.id 
        await PostModel.destroy( {
            where:{
                id:id
            }
        })
    
        res.status(202).send('se elimino la post')

    } catch (error) {
        res.status(500).send('Erorr al elimnar la post.')
        console.log(error)
    }

}

module.exports = {
    verPosts,
    verPostPorId,
    crearPost,
    editarPost,
    eliminarPost,
}

