const { Router } = require('express')

const {
    crearPost,
    editarPost,
    eliminarPost,
    verPostPorId,
    verPosts,
} = require ('../controllers/post.controller')

const router = Router()

router.get('/',verPosts);
router.get('/:id',verPostPorId);
router.post('/',crearPost);
router.put('/:id',editarPost);
router.delete('/:id',eliminarPost);
 



module.exports = router

// hacer el middleware y dentro el res.render('form ?')