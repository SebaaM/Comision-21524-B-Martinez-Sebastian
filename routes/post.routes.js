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
 
//middleware
router.use('/', (req, res, next ) => {
    console.log('Middleware asjdhnasjk')
    next()
})



module.exports = router