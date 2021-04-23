const createToken=require('../createToken')
const decode=require('../verify').decode
const encode=require('../verify').base64object
const refresh=require('../refreshToken')
describe("Testing the JWT", () => { 
  var token
  it("tests the token created", async() => {
    let response=createToken({ "name": "licious","iat": Math.round((new Date()).getTime()/1000)})
    token=response
     numberOfParts=response.split(".").length
     expect(numberOfParts).toBe(3)                       

  });

  it("tests the decode function", async() => {
    let response=decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
    console.log(typeof(response))
     expect(typeof(response)).toBe("object")                       

  });

  it("tests the encode function", async() => {
    let response=encode({ "name": "licious","iat": Math.round((new Date()).getTime()/1000)})
    expect(typeof(response)).toBe("string")                      

  });

  it("tests the refresh function", async() => {
    let response=refresh("Bearer "+token)
    expect(typeof(response)).toBe("string")                      

  });
});
