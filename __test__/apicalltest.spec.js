const supertest = require('supertest');
const app = require('../app');


describe("Testing the JWT", () => { 
var token;
  it("tests the valid login ", async() => {

    let response = await supertest(app).post('/login').send({userid:"user1",userpassword:"user1@123"})
    token=response.body.token
    expect(response.status).toBe(200)  
                                 

  });
  it("tests the invalid login ", async() => {

    let response = await supertest(app).post('/login').send({userid:"randomuser",userpassword:"randompassword"})
    
    expect(response.status).toBe(401)  
                                 

  });

    it("tests the valid token", async() => {

    let response = await supertest(app).post('/insidelogin').set('Authorization','Bearer '+token)

    expect(response.status).toBe(200)  
                                 

  });
  it("tests the invalid token", async() => {
    let response=(await supertest(app).post('/insidelogin').set('Authorization','Bearer '+'abcdef.g.f'))
    
    expect(response.status).toBe(401)  
                                 

  });

  it("tests the refresh endpoint", async() => {

    let response = await supertest(app).post('/refreshToken').set('Authorization','Bearer '+token)

    expect(response.status).toBe(200)  
                                 

  });
  
 
});


