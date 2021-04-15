const express = require('express')
const createToken=require('./createToken')
const verify=require('./verify')
const dataSchema=require('./Model')
const cors=require('cors')
const app=express()
const mongoose=require('mongoose')
app.use(cors())
app.use(express.json())
app.listen(8000,()=>{console.log("server started!")})
var payload
const url='mongodb+srv://licious:licious@cluster0.ua32k.mongodb.net/licious?retryWrites=true&w=majority'
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology: true})
const con=mongoose.connection
con.on('open',()=>{
    console.log('connected!');
})
app.post('/login',async(req,res)=>{
   payload={
    "name": req.query.name,
    "iat": Math.round((new Date()).getTime()/1000)
  }
  let data=await dataSchema.findOneAndUpdate({"name":req.query.name},{"token":createToken(payload),"tokenCreatedTime":Math.round((new Date()).getTime()/1000)})
  await data.save()

  res.json(data)
  })

 app.post('/addusers',async(req,res)=>{
  const newData=new dataSchema({
    name:req.query.name,
    password:req.query.password
    

})
await newData.save()
res.send("data added!")
 }) 
  



app.post('/insidelogin',verify,async(req,res)=>{
  let data= await dataSchema.find({"name":req.query.name})
  if(req.token===data[0].token){
    res.send("ACCESS GRANTED!")
  }
  else{
    res.send("ACCESS DENIED!")
  }

})

app.post('/refreshToken',async(req,res)=>{
  let data= await dataSchema.find({"name":req.query.name})
  let difference=Math.round((new Date()).getTime()/1000)-data[0].tokenCreatedTime
  if(difference>30){
    data=await dataSchema.findOneAndUpdate({"name":req.query.name},{"token":createToken(payload),"tokenCreatedTime":Math.round((new Date()).getTime()/1000)})
  await data.save()
  }
  res.json(data)
  
})




