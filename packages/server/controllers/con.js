const database = require("../controllers/database");

var exports = module.exports = {};

  exports.login = async (formdata) => {
      const { userid, password } = formdata;
      const login = await database.loginDB(userid, password);
      return {
        success: login.success,
        message: login.message,
        token: login.token
      };
  }

  exports.register = async (formdata) => {
      const register = await database.registerDB(formdata);
      return {
        success: register.success,
        message: register.message,
      };
  }


  exports.trainerImg = async (user,url1, url2) => {
  
    const trainerImg = await database.trainersImg(user,url1, url2);

    return {
      success : trainerImg.success,
      message : trainerImg.message
    }
  }



  exports.trainers = async (formdata, user) => {
      const trainer = await database.trainers(formdata,user);

      if(!user) {
        return {
          success : true,
          message : '로그인이 필요합니다.'
        }
      }

      return {
        success: trainer.success,
        message: trainer.message,
      };
  }

  exports.story = async () => {
      const stroy = await database.story()

      return {
        success : stroy.success,
        message : stroy.message

      }
  }

  exports.storyDetail = async (num) => {
      const stroyDetail = await database.storydetailDb(num)
      return {
        success : stroyDetail.success,
        results : stroyDetail.results
      }
  }

  exports.storyFika = async (file, data, user) => {
      if(!user) {
        return {
          success: true,
          message : '로그인이 필요합니다.'
        }
      }
      const storyFika = await database.FikaDb(file, data, user)
      console.log(storyFika)
      return {
        success : storyFika.success,
        message : storyFika.message,

      }
  }

  exports.photo =  async () => {
      const photo = await database.photo()
      return {
        success : photo.success,
        results : photo.results
      }
  }

  exports.photoDetail = async (num) => {
      const photoDetail = await database.photodetailDb(num)

      return {
        success : photoDetail.success,
        results : photoDetail.results,
      }
  }

  



