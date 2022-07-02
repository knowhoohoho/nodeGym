const userData = require("../../controllers/con");
const check = require('../../controllers/userck')

module.exports = {
  apiUrl: "/auth/trainers",
  method: "post",
  runner: async (req, res) => {
    try {
      console.log(req.body)
      if (req.isLogin === false) {
        return res.status(200).json({
          success: false,
          message: "로그인이 필요합니다.",
        });
      }

      const [validError] = await check.trainers.validate(req.body)
      
      if(validError){
        let err = new Error(`Trainervalidate : ${validError.message}`)
        throw err
      }

      const loginUser =  req.userInfo
      const trainerData = req.body;
      const user = await userData.trainers(trainerData, loginUser.id);

      return res.status(200).json({
        success: user.success,
        message: user.message,
      });
    } catch (e) {
      console.log(e);
    }
  },
};
