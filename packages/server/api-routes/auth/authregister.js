const userData = require("../../controllers/con");
const check = require('../../controllers/userck')


module.exports = {
  apiUrl: "/auth/register",
  method: "post",
  runner: async (req, res, next) => {
    try {
      const [validErrorRegister] = await check.register.validate(req.body)

      if(validErrorRegister) {
        let err = new Error(`validErrorRegister : ${validErrorRegister.message}`)
        throw err
      }

      const userdata = req.body;
      const user = await userData.register(userdata);

      return res.status(200).json({
        success: user.success,
        message: user.message,
      });

    } catch (e) {
      next(e)
    }
  },
};
