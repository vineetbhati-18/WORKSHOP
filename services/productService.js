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


module.exports={getAllProducts,getProductById}