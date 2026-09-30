const express=require('express')
const productController=require('../controllers/productController')
const router=express.Router()
const cache = require('../middleware/cacheMiddleware')


router.get('/products',cache.cacheMiddleware,productController.getProducts)
router.get('/products/:id',cache.cacheMiddleware,productController.getProductById)
router.post('/products',productController.createProduct)
router.put('/products/:id',productController.updateProduct)
router.delete('/products/:id',productController.deleteProduct)
router.patch('/products/:id',productController.updateProduct)


module.exports=router