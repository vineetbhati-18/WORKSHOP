const productService=require('../services/productService')
const cache=require('../middleware/cacheMiddleware')

async function getProducts(req,res){
    try {
        const key=req.originalUrl
        const cachedProducts=cache.checkCache(key)
        if(cachedProducts){
            res.set('X-Cache','HIT')
            return res.json(cachedProducts)
        }
        const products=await productService.getAllProducts()
        cache.saveCache(key,products)
        res.set('X-Cache','MISS')
        res.json(products)
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: 'Failed to fetch products'
        })
    }
}


async function getProductById(req,res){
    try {
        const id=Number(req.params.id)
        const key=req.originalUrl
        const cachedProduct=cache.checkCache(key)
        if (cachedProduct){
            res.set('X-Cache','HIT')
            return res.json(cachedProduct)
        }
        const product=await productService.getProductById(id)
        if (!product){
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        cache.saveCache(key,product)
        res.set('X-Cache', 'MISS')
        res.json(product)
    } catch(error){
        console.log(error)
        res.status(500).json({
            message: 'Failed to fetch product'
        })
    }
}


async function createProduct(req,res){
    try {
        const product=await productService.createProduct(req.body)
        cache.clearCache()
        res.status(201).json(product)
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: 'Failed to create product'
        })
    }
}


async function updateProduct(req,res){
    try {
        const id=req.params.id
        const data=req.body
        const product=await productService.updateProduct(id,data)
        res.json(product)
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Failed to update product"
        })
    }
}


module.exports={getProducts,getProductById,createProduct,updateProduct}