const mongo= require('mongoose');

const contentSchema= mongo.Schema({
    content:{type:String,required:true},
    id:{type:Object,required:true},
});


module.exports= mongo.model('confessionContent',contentSchema);