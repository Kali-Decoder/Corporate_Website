const mongo= require('mongoose');
const dateTime= require('date-and-time');
const now = new Date();
const blogSchema= mongo.Schema({
    title:{type:String,required:true},
    description:{type:String,require:true},
    image:{type:String,required:false},
    createdAt:{type:String,default:dateTime.format(now, 'ddd, MMM DD YYYY')},
});


module.exports= mongo.model('project1Blog',blogSchema);