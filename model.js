const mongoose=require('mongoose')

const licious= new mongoose.Schema({

name:String,
token:{type:String,default:'invalid'},
password:String,
tokenCreatedTime:{type:Number,default:0}
}
)

module.exports=mongoose.model('dataSchema',licious)