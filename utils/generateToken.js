var jwt = require("jsonwebtoken");

module.exports= async (paylod)=>{
    const token = await jwt.sign(
        paylod,
        process.env.JWT_SECRETKEY,
        { expiresIn: "10m" }
      );
      return token;
}