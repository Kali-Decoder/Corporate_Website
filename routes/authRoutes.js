const express= require('express');
// const controller= require('../controllers/authController');
const router= express.Router();
const nodeMailer= require("nodemailer");
const PostBlog= require('../models/postModel');
const fileUpload= require('../middleware/fileUpload');
// router.get('/signup',controller.getSignupController);
// router.get('/login',controller.getLoginController);
// router.post('/login',controller.postLoginController);
// router.post('/signup',controller.postSignupController);
// router.post('/logout',controller.logoutController);

router.get('/',(req,res)=>{
    res.render('index');
});
router.get('/about',(req,res)=>{
    res.render('about.ejs');
});
router.get('/contact-us',(req,res)=>{
    res.render('contact.ejs');
})
router.get('/services',(req,res)=>{
    res.render('services.ejs');
});

router.get('/blog-section',(req,res)=>{
    res.render('BlogSection');
});

router.get('/team-page',(req,res)=>{
    res.render('TeamPage');
});

router.get('/get-blogs',async (req,res)=>{
    try {
        
        const data= await PostBlog.find({});
        res.json(data);

    } catch (error) {
        console.log(error)
    }
})


router.post('/blog-post',fileUpload,async (req,res)=>{
   const obj={...req.body,...req.file};

    try {
        
        const data = new PostBlog({title:obj.title,description:obj.description,image:obj.filename});
        const response= await data.save();
        // return res.json({message:'Blog Is Submitted',hasError:false});
        res.redirect("/blog-section");

    } catch (error) {
        console.log(error);
        return res.json({message:'Blog Is Not Submitted',hasError:true});
    }

});

router.post('/sending',(req,res)=>{
    const {data}= req.body;
    const senderDetails= nodeMailer.createTransport({
        service:'gmail',
        auth:{
            user:'Envoyscorporate@gmail.com',
            pass:'Envoys@123',
        }
    });
    const mailOptions={
        from:data.email,
        to:'Envoyscorporate@gmail.com',
        subject:data.subject,
        text:`Mail is From ${data.name} message is: ${data.message}`,
    }
    
    senderDetails.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error);
           return res.json({message:"Message Not Post ",hasError:true});
        }else{
            console.log(info);
            return res.json({message:"Message Post Successfylly !!!",hasError:false});
        }
    });

})

module.exports=router;
