const userData = require('../../controllers/con');
const check = require('../../controllers/userck')



module.exports = {
  apiUrl: "/auth/login",
  method: "post",
  runner: async (req, res, next) => {
    try {
     const [validateError] = await check.login.validate(req.body)
  
     if(validateError){
        let err = new Error(`validateLogin : ${validateError.message}`)
        throw err
    }

    const userform = req.body;
    const user = await userData.login(userform)
    
    return res.status(200).json({
      success : user.success,
      message : user.message,
      token : user.token
    })
    } catch (e) {
      next(e)
    } 
  },
};
