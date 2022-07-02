const img = require("../../controllers/multer");
const userData = require("../../controllers/con");
const check = require("../../controllers/userck");





module.exports = {
  apiUrl: "/auth/Fika",
  method: "post",
  middleware: img.single.single("storyIg"),
  runner: async (req, res, next) => {
    try {
      const [validError] = await check.fikaList.validate(req.body, req.file);
      const user = req.userInfo;

      if (!user) {
        return res.status(200).json({
          success: true,
          message: "로그인이 필요합니다.",
        });
      }

      if (validError) {
        throw new Error(`validateFikaError : ${validError.message} `);
      }


      const Data = req.body;
      const img = req.file
      if(!img) {
        return res.status(200).json({
          success : false,
          message : '이미지가 존재하지 않습니다.'
        })
      }
      const imgUrl = req.file.location;

      const Fika = await userData.storyFika(imgUrl, Data, user);
      console.log(Fika)
      return res.status(200).json({
        success: Fika.success,
        message: Fika.message,
        userNum: user.id,
      });
    } catch (e) {
      next(e);
    }
  },
  
}

