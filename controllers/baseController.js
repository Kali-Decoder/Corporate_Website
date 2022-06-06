const confessionModel = require("../models/confessionModel");
const flashedSession = require("../utils/flashedSession");
function getNewConfessionController(req, res) {
  let renderData = flashedSession.getsessionData(req);

  if (!renderData) {
    renderData = {
      hasError: false,
      content: "",
    };
  }
  res.render("createConfession", {
    pagetitle: "Make Your Confession",
    data: renderData,
  });
}
async function postNewConfessionController(req, res, next) {
  if (!req.body.content) {
    flashedSession.flashedDataToSession(
      req,
      {
        hasError: true,
        message: "Please Write Your Confession ",
        content: req.body.content,
      },
      function () {
        res.redirect("/new-confession");
      }
    );
    return;
  }
  const user = {
    content: req.body.content,
    id: Object(res.locals.uid),
  };
  
  try {
    const saveData = new confessionModel(user);
    await saveData.save();
    flashedSession.flashedDataToSession(
      req,
      {
        hasError: false,
        message: "Your Confession Is Saved Successfully !",
        content: "",
      },
      function () {
        res.redirect("/new-confession");
      }
    );
  } catch (error) {
    next(error);
    return;
  }
}

async function yourConfessionController(req, res, next) {
    let uid= res.locals.uid;
    try {
        const data = await confessionModel.find({id:uid});
        res.render('YourConfession.ejs',{pagetitle:"Your Confessions",data:data});
    } catch (error) {
        next(error);
        return;
    }
}

async function allConfessionController(req, res, next) {
    
    try {
        const data = await confessionModel.find();
        // res.send(data);
        res.render('AllConfessions.ejs',{pagetitle:"All Confessions",data:data});
    } catch (error) {
        next(error);
        return;
    }
}

async function editPostController(req, res, next) {
    const id= req.params.id;
  try {
      const data = await confessionModel.find({_id:id});   
      res.render('updatePost.ejs',{pagetitle:"Update Your Confession",data:data[0]});
  } catch (error) {
      next(error);
      return;
  }
}

async function editpostPostController(req, res, next) {
  const id= req.params.id;
  const content=req.body.content;
try {
    await confessionModel.findByIdAndUpdate({_id:id},{content:content});
    res.redirect('/your-confessions');
} catch (error) {
    next(error);
    return;
}
}

async function deletePostController(req, res, next) {
    const id= req.params.id;

  try {
      
    await confessionModel.findByIdAndDelete({_id:id});
    res.redirect('/your-confessions');

  } catch (error) {
      next(error);
      return;
  }
}



module.exports = {
  getNewConfessionController,
  postNewConfessionController,
  yourConfessionController,
  allConfessionController,
  editPostController,
  deletePostController,editpostPostController

};
