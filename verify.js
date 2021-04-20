var CryptoJS=require('crypto-js')
require('dotenv').config();
var SECRET_KEY=process.env.SECRET_KEY

//function to decode base64
function decode(input)
{
  try {
  var words = CryptoJS.enc.Base64.parse(input);
  
  var textString = CryptoJS.enc.Utf8.stringify(words);
 
    result=JSON.parse(textString)
  }
  catch{
    return false
  }
  return result
}

//function to convert json to base64
var base64object=function(input){
  var inputwords=CryptoJS.enc.Utf8.parse(JSON.stringify(input))
  var base64=CryptoJS.enc.Base64.stringify(inputwords)
  
  return base64
}

//function to validate token
function verify(req,res,next)
{
    const bearerheader=req.headers['authorization'];  
    let validToken=false
    if(typeof bearerheader!=='undefined'){
      const bearer=bearerheader.split(" ")
      if(bearer.length==2){
      var token=bearer[1].split('.')
      if(token.length==3){

        header=decode(token[0])
        payload=decode(token[1])
        if(header && payload){
          
          var unsignedToken= base64object(header)+'.'+base64object(payload)
          var signatureHash=CryptoJS.HmacSHA256(unsignedToken,SECRET_KEY)
          var signature=CryptoJS.enc.Base64.stringify(signatureHash)
          
          if(signature==token[2]){
            currentTime=Math.round((new Date()).getTime()/1000)
            tokenExpiration=payload.exp
            if(tokenExpiration>=currentTime){
            validToken=true
            }
          }
        }
       
      }
    }
    }
    if(validToken){
      next()
    }
    else{
      res.sendStatus(401)
    }
  }


  module.exports=verify
  