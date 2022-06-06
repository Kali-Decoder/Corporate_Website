function checkAuthentication(req,res,next){
    let uid = req.session.uid;
    if(!uid){
        return next();
    }
    res.locals.uid= uid;
    res.locals.email= req.session.email;
    res.locals.isAdmin= req.session.isAdmin;
    res.locals.isAuth=true;
    next();
}

module.exports=checkAuthentication;