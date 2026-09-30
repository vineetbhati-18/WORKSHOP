const productService=require('../services/productService')

async function getProducts(req,res){
    try {
        const products=await productService.getAllProducts()
        res.json(products)
    } catch (error) {
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


module.exports={getProducts}