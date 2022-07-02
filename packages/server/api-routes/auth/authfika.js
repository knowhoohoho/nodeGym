const jwt = require('jsonwebtoken')
const db = require('../../DB/db')

module.exports = {
    apiUrl : '/auth/FikaRegistration',
    method : 'post',
    runner : (req,res) => {
        try {
            const  token = req.cookies.user;
            const tokenResult = jwt.verify(token, 'Superkey')
  
              if(tokenResult) {
                const { title, content } = req.body
                  res.render('home', {
                      success : true,
                  })
              }else {
                  res.render('home', {
                      success : false,
                  })
              }
  
          } catch (e) {
            next(e)
          }






          
    }
}