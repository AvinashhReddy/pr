const express = require('express')
const createToken=require('./createToken')
const verify=require('./verify')
const dataSchema=require('./model')
const cors=require('cors')
const app=express()
const mongoose=require('mongoose')
const bodyParser = require('body-parser');
app.use(cors())
app.use(express.json())
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.listen(process.env.PORT || 8000,()=>{console.log("server started!")})
var payload
const url='mongodb+srv://licious:licious@cluster0.ua32k.mongodb.net/licious?retryWrites=true&w=majority'
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology: true})
const con=mongoose.connection
con.on('open',()=>{
    console.log('connected!');
})

app.post('/login',async(req,res)=>{
  
   payload={
    "name": req.body.name,
    "iat": Math.round((new Date()).getTime()/1000)
  }
  token=createToken(payload)
  
  res.send(token)
  })

 app.post('/addusers',async(req,res)=>{
  const newData=new dataSchema({
    name:req.body.name,
    password:req.body.password
    

})
await newData.save()
res.send("data added!")
 }) 
  



app.post('/insidelogin',verify,async(req,res)=>{
 
res.send("ACCESS GRANTED!")
})

app.post('/refreshToken',verify,async(req,res)=>{
  payload={
    "name": req.body.name,
    "iat": Math.round((new Date()).getTime()/1000)
  }
  token=createToken(payload)
  
  res.send(token)
  
})
app.post('/logout',verify,(req,res)=>{
  res.send("loggedout")
})



