const express = require("express");
const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const ext=file.mimetype.split('/')[1];
    const filename = `user-${Date.now()}.${ext}`
    cb(null, filename)
  }
})
const fileFilter=(req,file,cb)=>{
  const fileType=file.mimetype.split('/')[0];
  if(fileType==='image'){
    return cb(null,true)
  }else{
    appErrors.create("Not Allowed File Extention",400,ERROR)
    return cb(appErrors,false)
  }
}
const upload = multer({
   storage: storage,
  fileFilter,
  });

const {
  getAllUsers,
  login,
  register,
} = require("../controllers/users.controller");
const verifyToken = require("../middlewares/veritfyToken");
const appErrors = require("../utils/appErrors");
const { ERROR } = require("../utils/httpStatusText");
const router = express.Router();

router.route("/").get(verifyToken,getAllUsers);
router.route("/login").post(login);
router.route("/register").post(upload.single('avatar'),register);

module.exports = router;
