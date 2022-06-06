const mongo = require('mongoose');
const DB=process.env.DB;

mongo.connect(DB,{useNewUrlParser:true}).then(()=>{
    console.log("Database is connected !");
}).catch((e)=>{
    console.log("Database is not connected : "+e);
})