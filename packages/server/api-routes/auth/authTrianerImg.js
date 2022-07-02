const img  = require('../../controllers/multer');
const userData = require("../../controllers/con");


module.exports = {
  apiUrl: "/auth/trainerImage",
  method: "post",
  middleware:  img.files.fields([{name :'upload'} ,{name : 'suupload'}]),
  runner : async (req, res, next) => {
    try {


      const User = req.userInfo
      const productImg = req.files
      const [upload] = productImg.upload
      const [suupload] = productImg.suupload

      // img url
      const uploadURL = upload.location
      const suploaddURL = suupload.location

      const trainerImg = await userData.trainerImg(User,uploadURL,suploaddURL);

        return res.status(200).json({
          success : trainerImg.success,
          message : trainerImg.message
        })  
         
    } catch (e) {
        next(e)
    }
  }
};
