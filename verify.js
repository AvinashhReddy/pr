function verify(req,res,next){
    const bearerheader=req.headers['authorization'];
    if(typeof bearerheader!=='undefined'){
      const bearer=bearerheader.split(" ")
      req.token=bearer[1]
      next()
    }
    else{
      res.send("ACCESS DENIED!")
    }
  }
  module.exports=verify