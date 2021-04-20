var CryptoJS=require('crypto-js');
const createToken = require('./createToken');
//function to decode base64
function decode(input)
{
  
  var words = CryptoJS.enc.Base64.parse(input);
  
  var textString = CryptoJS.enc.Utf8.stringify(words);
 
    result=JSON.parse(textString)
  
  return result
}

function refreshToken(input)
{
    const bearerheader=input; 
    const bearer=bearerheader.split(" ")
    let token=bearer[1]
    payload=decode(token.split('.')[1])
    payload.exp=Math.round((new Date()).getTime()/1000)+30

    return createToken(payload)
    
    
}
module.exports=refreshToken