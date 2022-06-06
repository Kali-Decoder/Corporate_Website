function getsessionData(req){
    const data= req.session.flashedData;
    req.session.flashedData=null;
    return data;
}

function flashedDataToSession(req,data,action){
    req.session.flashedData= data;
    req.session.save(action);
}

module.exports={
    getsessionData,flashedDataToSession
}