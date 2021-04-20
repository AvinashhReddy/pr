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
    currentTime=Math.round((new Date()).getTime()/1000)
    tokenCreationTime=payload.iat
    difference=currentTime-tokenCreationTime
    console.log(difference)
    if(difference>=30){

        payload.iat=Math.round((new Date()).getTime()/1000)
        return createToken(payload)
    }
    return token
}
module.exports=refreshToken