const express = require('express')
const createToken=require('./createToken')
const verify=require('./verify')
//const dataSchema=require('./model')
const cors=require('cors')
const refreshToken=require('./refreshToken')
const app=express()
//const mongoose=require('mongoose')
const bodyParser = require('body-parser');
app.use(cors())
app.use(express.json())
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


const server= app.listen(process.env.PORT || 8000,()=>{console.log("server started!")})

/*const url='mongodb+srv://licious:licious@cluster0.ua32k.mongodb.net/licious?retryWrites=true&w=majority'
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology: true})
const con=mongoose.connection
con.on('open',()=>{
    console.log('connected!');
})*/


//returns access token on Login
app.post('/login',async(req,res)=>{
  
  let payload={
    "name": req.body.name,
    "exp": Math.round((new Date()).getTime()/1000)+30
  }
  token=createToken(payload)
  payload.exp+=50000
  refToken=createToken(payload)
  res.json({token,refToken})
  })


 
  


//accessing a protected route. verifies the token and returns "access granted" if valid
app.post('/insidelogin',verify,async(req,res)=>{
 
res.json("ACCESS GRANTED!")
})


//verifes the token and returns new token                    
app.post('/refreshToken',verify,async(req,res)=>{      

  res.send(refreshToken(req.headers['authorization']))
  
})                                            







app.post('/logout',verify,(req,res)=>{
  res.send("loggedout")
})


module.exports=server
