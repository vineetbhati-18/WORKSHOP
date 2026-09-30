const productDatabase=require('../database/productDatabase')


async function getAllProducts(){
    const products=await productDatabase.getProducts()
    return products;
}


module.exports={getAllProducts}