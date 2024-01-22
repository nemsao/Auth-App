const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const {connection}=require('./database/connect')
const app=express();
const router = require('./router/router')
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.disabled('x-powered-by')

const port=8080;

app.get('/',(req,res,next)=>{
    res.status(201).send('Home get request')
})
app.use('/api',router)

connection().then(()=>{
    try{
        app.listen(port,()=>{
    console.log(`Sever connected to local host at http://localhost:${port}`)
})
    }
    catch(err){
    console.log(err)}

}).catch(err=>console.log(err))
    


