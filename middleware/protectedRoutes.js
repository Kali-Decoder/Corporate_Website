function protectRoutes(req,res,next){
    /** Your Are Not Authenticated */
    if(req.path.startsWith('/all-confessions') && !res.locals.isAuth)
    {
        return res.status(401).redirect('/401');
    }
    if(req.path.startsWith('/your-confessions') && !res.locals.isAuth)
    {
        return res.status(401).redirect('/401');
    }
    if(req.path.startsWith('/new-confession') && !res.locals.isAuth)
    {
        return res.status(401).redirect('/401');
    }
    /** Your Are Not Authorised */
    if(req.path.startsWith('/admin') && !res.locals.isAdmin){
        return res.status(403).redirect('/403');
    }
    next();
}

module.exports= protectRoutes;