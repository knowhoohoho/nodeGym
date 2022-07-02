const userData = require("../../controllers/con");


module.exports = {
  apiUrl: "/photo",
  method: "post",
  runner: async (req, res) => {
    try {
      const userIn = req.isLogin
      const photo = await userData.photo()    
      

      return res.status(200).json({
          success: photo.success,
          results : photo.results,
          user : userIn

        })
    } catch (e) {
      next(e)
    }
  },
};
