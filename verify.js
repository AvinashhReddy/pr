var CryptoJS=require('crypto-js')
require('dotenv').config();
var SECRET_KEY=process.env.SECRET_KEY
function decode(input){
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
var base64object=function(input){
  var inputwords=CryptoJS.enc.Utf8.parse(JSON.stringify(input))
  var base64=CryptoJS.enc.Base64.stringify(inputwords)
  
  return base64
}
function verify(req,res,next)
{
    const bearerheader=req.headers['authorization'];
    let validToken=false
    if(typeof bearerheader!=='undefined'){
      const bearer=bearerheader.split(" ")
      var token=bearer[1].split('.')
      if(token.length==3){

        header=decode(token[0])
        payload=decode(token[1])
        if(header && payload){
          
          var unsignedToken= base64object(header)+'.'+base64object(payload)
          var signatureHash=CryptoJS.HmacSHA256(unsignedToken,SECRET_KEY)
          var signature=CryptoJS.enc.Base64.stringify(signatureHash)
          
          if(signature==token[2]){
            validToken=true
          }
        }
       
      }
  
    }
    if(validToken){
      next()
    }
    else{
      res.send("Access Denied!")
    }
  }
  module.exports=verify
  