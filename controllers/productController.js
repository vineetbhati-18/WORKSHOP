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


module.exports={getProducts}