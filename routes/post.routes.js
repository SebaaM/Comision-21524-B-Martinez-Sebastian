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
router.post('/:id',editarPost);
router.delete('/:id',eliminarPost);
 



module.exports = router
