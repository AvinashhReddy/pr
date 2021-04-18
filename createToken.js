require('dotenv').config();
var CryptoJS=require('crypto-js')

var removeIllegalCharacters=function(input){
    return input.replace(/=/g,'')
                .replace(/\+/g,'-')     
                .replace(/\//g,'_')
}

var base64object=function(input){
    var inputwords=CryptoJS.enc.Utf8.parse(JSON.stringify(input))
    var base64=CryptoJS.enc.Base64.stringify(inputwords)
    var output=removeIllegalCharacters(base64)
    return output
}

var SECRET_KEY=process.env.SECRET_KEY
function createToken(payload){
    
var header={'alg':'HS256','typ':'JWT'}
var unsignedToken= base64object(header)+'.'+base64object(payload)
var signatureHash=CryptoJS.HmacSHA256(unsignedToken,SECRET_KEY)
var signature=CryptoJS.enc.Base64.stringify(signatureHash)
var token=unsignedToken+"."+signature;
var formattedToken=removeIllegalCharacters(token)

return formattedToken
  
}

module.exports=createToken
