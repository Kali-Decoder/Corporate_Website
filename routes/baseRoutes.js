const express= require('express');
const controller= require('../controllers/baseController');
const router= express.Router();
// const userModel= require('../models/authModel');

router.get('/',(req,res)=>{
    res.render("Home",{pagetitle:"Home"});
});

router.get('/new-confession',controller.getNewConfessionController);
router.post('/new-confession',controller.postNewConfessionController);
router.get('/your-confessions',controller.yourConfessionController);
router.get('/all-confessions',controller.allConfessionController);
router.get('/edit/:id',controller.editPostController);
router.post('/edit/:id',controller.editpostPostController);
router.get('/delete/:id',controller.deletePostController);


router.get('/admin',(req,res)=>{
    res.render('Admin.ejs',{pagetitle:'Admin Page'})
});

router.get('/post/:id',(req,res)=>{
    const id= req.params.id;
    res.render('SinglePost.ejs',{pagetitle: "Single Post"});
    
});

// router.get('/countuser',async(req,res)=>{
//     try {
//         const data= await userModel.find();
//         const number= data.length();
//         res.json(number);
//     } catch (error) {
//         next(error);
//         return;
//     }

// });


module.exports=router;
