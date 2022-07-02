const userData = require("../../controllers/con");
const validate = require('../../controllers/userck')

module.exports = {
  apiUrl: "/story",
  method: "post",
  runner: async (req, res, next) => {
    try {
      const userIn = req.isLogin;
      const storyuser = await userData.story();

      return res.status(200).json({
        success: storyuser.success,
        results: storyuser.message,
        user: userIn,
      });

    } catch (e) {
      next(e);
    }
      
  }
};