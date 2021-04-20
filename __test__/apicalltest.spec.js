const supertest = require('supertest');
const app = require('../app');


describe("Testing the JWT", () => { 

    it("tests the valid token", async() => {

    const response = await supertest(app).post('/insidelogin').set('Authorization','Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcjEiLCJleHAiOjUwMDAwMTYxODkwNDU5OX0=.IgzZV3rQc/I/Bo7u2uk86cHf07u4sHvRP+g3aw3WCFM=')

    expect(response.status).toBe(200)  
                                 

  });
  it("tests the invalid token", async() => {
    const response=(await supertest(app).post('/insidelogin').set('Authorization','Bearer '+'abc.def.gji'))
    
    expect(response.status).toBe(401)  
                                 

  });
  
 
});


