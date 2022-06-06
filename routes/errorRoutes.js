const express= require('express');
const router= express.Router();

router.get('/401',(req,res)=>{
    res.render('./errorsFiles/401.ejs',{pagetitle:"Not Authenticated Person"});
})
router.get('/403',(req,res)=>{
    res.render('./errorsFiles/403.ejs',{pagetitle:"Not Authorised Person"});
})

module.exports=router;