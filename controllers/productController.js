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
        const product=await productService.getProductById(id)
        if(!product){
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        res.json(product)
    } catch(error){
        console.log(error)
        res.status(500).json({
            message: 'Failed to fetch product'
        })
    }
}


module.exports={getProducts,getProductById}