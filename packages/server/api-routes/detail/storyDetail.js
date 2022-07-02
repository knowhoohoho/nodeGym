const userData = require("../../controllers/con");
const check = require('../../controllers/userck')

module.exports = {
  apiUrl: "/story/detail",
  method: "post",
  runner: async (req, res, next) => {
    try {
      console.log('req',req.body)
    const [validError] = await check.storyDetail.validate(req.body)

    if(validError) {
      
      throw new Error(`validatastoryDetail: ${validError.message}`)
  }
    
    const [imgNum] = req.body

    const imgData = await userData.storyDetail(imgNum)
      console.log(imgData.results)

    return res.status(200).json({
      success : imgData.success,
      results : imgData.results,
    })

    } catch (e) {
      next(e)
    } 
  },
};
