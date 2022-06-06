function createUserSession(req,data,action){
    req.session.uid= data._id.toString();
    req.session.isAdmin=data.isAdmin;
    req.session.email=data.email;
    req.session.save(action);
}
function destroySession(req){
    req.session.uid=null;
}

module.exports={createUserSession,destroySession};