const userData = require("../../controllers/con");

module.exports = {
  apiUrl: "/photo/detail/",
  method: "post",
  runner: async (req, res) => {
    try {
    const userIn = req.isLogin
    const photoNum = req.body;
    const photoImg =  await userData.photoDetail(photoNum)
 

    return res.status(200).json({
      success : photoImg.success,
      results : photoImg.results,
      user : userIn 
    })

    } catch (e) {
      next(e)
    }
  },
};
