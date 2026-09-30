const cache={}
const TTL=60000


function checkCache(key){
    if(!cache[key]){
        return null
    }
    const currentTime=Date.now()
    const cacheAge=currentTime-cache[key].createdAt
    if (cacheAge>=TTL){
        delete cache[key]
        return null
    }
    return cache[key].data
}


function saveCache(key,data){
    cache[key]={
        data: data,
        createdAt: Date.now()
    }
}


function cacheMiddleware(req,res,next){
    const key=req.originalUrl
    const data=checkCache(key)
    if(data){
        res.set('X-Cache','HIT')
        return res.json(data)
    }
    res.set('X-Cache','MISS')
    const originalJson=res.json
    res.json=function(data){
        saveCache(key,data)
        return originalJson.call(this,data)
    }
    next()
}


function clearCache(){
    Object.keys(cache).forEach((key)=>{
        delete cache[key]
    })
}


module.exports={checkCache,saveCache,clearCache,cacheMiddleware}