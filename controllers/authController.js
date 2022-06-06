const authModel = require("../models/authModel");
const flashedSession = require("../utils/flashedSession");
const auth= require('../utils/auth-check');
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");

function getSignupController(req, res, next) {
  let renderData = flashedSession.getsessionData(req);

  if (!renderData) {
    renderData = {
      hasError: false,
      name: "",
      email: "",
      password: "",
    };
  }

  res.render("./authViews/signup.ejs", {
    pagetitle: "Signup",
    data: renderData,
  });
}

async function postSignupController(req, res, next) {
  const filledData = req.body;
  let password = filledData.password;
  if (
    !filledData.name ||
    !filledData.email ||
    !filledData.password ||
    !filledData.college ||
    !filledData.branch ||
    !filledData.presentyear
  ) {
    flashedSession.flashedDataToSession(
      req,
      {
        hasError: true,
        message: "Please Filled All Inputs !!!",
        name: filledData.name,
        email: filledData.email,
        password: filledData.password,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }
  const userExist = await authModel.find({ email: filledData.email });
  if (userExist.length != 0) {
    flashedSession.flashedDataToSession(
      req,
      {
        hasError: true,
        message: "User Exist Already !",
        name: filledData.name,
        email: filledData.email,
        password: filledData.password,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }


const  hashedPassword = await bcrypt.hash(password, 12);

  const user = {
    ...filledData,
    password: hashedPassword,
  };
  // console.log(user);

  try {
    const createdUser = new authModel(user);
    await createdUser.save();
    res.redirect("/login");
    console.log("User is save...");
  } catch (error) {
    next(error);
    return;
  }
}

function getLoginController(req, res, next) {
    let renderData= flashedSession.getsessionData(req);
    
    if(!renderData){
        renderData={
            hasError:false,
            email:'',
            password:''
        }
    }
  res.render("./authViews/login.ejs", { pagetitle: "Login" ,data:renderData});
}

async function postLoginController(req, res, next) {
    const filledData= req.body;
    if(!filledData.email || !filledData.password){
        flashedSession.flashedDataToSession(
            req,
            {
              hasError: true,
              message: "Please Filled All Details !",
              email: filledData.email,
              password: filledData.password,
            },
            function () {
              res.redirect("/login");
            }
        ); 
        return;
    }
    const userExist= await authModel.find({email:filledData.email});
    if(userExist.length==0){
        flashedSession.flashedDataToSession(
            req,
            {
              hasError: true,
              message: "User Does Not Exist!",
              email: filledData.email,
              password: filledData.password,
            },
            function () {
              res.redirect("/login");
            }
        );
        return; 
    }
    const isMatch= await bcrypt.compare(filledData.password,userExist[0].password);
    
    if(!isMatch){
        flashedSession.flashedDataToSession(
            req,
            {
              hasError: true,
              message: "Incorrect Password, Please try again...",
              email: filledData.email,
              password: filledData.password,
            },
            function () {
              res.redirect("/login");
            
            }
        );
        return;
    }
    auth.createUserSession(req,userExist[0],function(){
        res.redirect('/');
        return;
    });
    
}


function logoutController(req,res,next){
    auth.destroySession(req);
    res.redirect('/login');
    return;
}

module.exports = {
  getSignupController,
  postSignupController,
  getLoginController,
  postLoginController,logoutController,
};
