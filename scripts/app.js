const espress=require('express')
const app=express()
app.get('/health',(req,res)=>{
    res.josn({
        status:"ok",
        message:"API server running"
    })
})
app.listen(3000,()=>{
    console.log("API running on prot 3000")
})