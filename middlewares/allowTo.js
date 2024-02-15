const appErrors = require("../utils/appErrors");
const { ERROR } = require("../utils/httpStatusText");

module.exports = (...roles) => {
  // console.log("roools", roles);
  return (req, res, next) => {
    if (!roles.includes(req.decodedToken.role)) {
     appErrors.create("Not Allow to Do this action", 401, ERROR)
      return next( appErrors);
    }
    next();
  };
};
