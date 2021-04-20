const supertest = require('supertest');
const app = require('../app');
const createToken=require('../createToken')

describe("Testing the JWT", () => {

    it("tests the valid token", async() => {

    const response = await supertest(app).post('/insidelogin').set('Authorization','Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcjIiLCJpYXQiOjE2MTg3NDkxNTZ9.z+UX4WA9Nzo/bf9wvs/L4q/jKrJ1cDeoH+RTGZcHCgw=')

    expect(response.status).toBe(200)  
                                 

  });
  it("tests the invalid token", async() => {
    const response=(await supertest(app).post('/insidelogin').set('Authorization','Bearer '+'abc.def.gji'))
    
    expect(response.status).toBe(403)  
                                 

  });
  it("tests the token created", async() => {
    let response=createToken({ "name": "licious","iat": Math.round((new Date()).getTime()/1000)})
     numberOfParts=response.split(".").length
     expect(numberOfParts).toBe(3)                       

  });
});