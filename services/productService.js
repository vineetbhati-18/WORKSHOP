const productDatabase=require('../database/productDatabase')


async function getAllProducts(){
    const products=await productDatabase.getProducts()
    return products;
}

async function getProductById(id){
    const products=await productDatabase.getProducts()
    const product=products.find((item)=>{
        return item.id===id
    })
    return product
}


async function createProduct(product){
    const products=await productDatabase.getProducts()
    product.id=products.length+1
    products.push(product)
    await productDatabase.saveProducts(products)
    return product
}


async function updateProduct(id,data){
    const products=await productDatabase.getProducts()
    const product=products.find(p=>p.id==id)
    if (!product){
        return null
    }
    product.name=data.name
    product.price=data.price
    await productDatabase.saveProducts(products)
    return product
}


module.exports={getAllProducts,getProductById,createProduct,updateProduct}