var mysql = require('mysql');
var md5 = require('md5')
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "licious@123",
  database: "sys"
});
async function verifyLogin(req,res,next){
    var validUser=false
    if(req.body.userid && req.body.userpassword){
    await con.query(`select userid,userpassword from jwt where userid='${req.body.userid}' and userpassword='${md5(req.body.userpassword)}';`, function (err, result) {
        if (err) throw err;
        if(result.length==1){
            
          validUser=true
          
        }
        if(validUser){
            next()
        }
        else{
            res.sendStatus(401)
        }
          
        
      });

    }
    else{
        res.sendStatus(401)
    }
    
    


}
module.exports=verifyLogin