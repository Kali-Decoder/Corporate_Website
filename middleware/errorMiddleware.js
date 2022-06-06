function handleErrorMiddleware(error,req,res,next){
    if(error.code===404)
    {
        return res.status(404).render('./errorsFiles/404.ejs',{pagetitle:'404 Not Found'});
    }
    res.status(500).render('./errorsFiles/500.ejs',{pagetitle:'Something Went Wrong'});
    next();
}

module.exports= handleErrorMiddleware;