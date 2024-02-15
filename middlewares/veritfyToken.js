var jwt = require('jsonwebtoken');
const appErrors = require('../utils/appErrors');
const { FAIL } = require('../utils/httpStatusText');

const verifyToken=(req,res,next)=>{
    const auth=req.headers["Authorization"] || req.headers["authorization"];
    if(!auth){
        appErrors.create("Token is required",401,FAIL);
        next(appErrors);
    }
    const token=auth.split(" ")[1];
    try{
        const decodedToken=jwt.verify(token, process.env.JWT_SECRETKEY);
        // console.log("token",token);
        // console.log("decodedToken",decodedToken);
        req.decodedToken=decodedToken; //to enable allowTo middleware to show this decodesToken include middleware
        return next();
    }catch(error){
        appErrors.create("Invalid Token",401,FAIL);
        next(appErrors);
    }
}
module.exports=verifyToken;