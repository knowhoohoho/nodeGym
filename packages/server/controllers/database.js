const pool = require("../DB/db");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltnum = 10;
const dotenv = require("dotenv");
var exports = module.exports = {};

dotenv.config();


let connection;
  
  exports.loginDB = async (userid, password) => {
      connection = await pool.getConnection();  
      const loginSQl = " SELECT * FROM t_user where userid = ?";
      const [[user]] = await connection.query(loginSQl, userid);

      if (!user) {
        return {
          success: false,
          message: "존재하지 않는 아이디입니다.",
        };
      }
      const passing = await bcrypt.compareSync(password, user.password);
      await connection.beginTransaction();

      if (!passing) {
        return {
          success: false,
          message: "비밀번호가 일치 하지 않습니다.",
        };
      }
      const token = await jwt.sign(
        {
          u_id: user.id,
        },
        'Superkey',
        { expiresIn: 60 * 60 * 60 }
      );
      await connection.release();
      return {
        success: true,
        message: "로그인이 완료되었습니다.",
        token: token,
      };
  },

  exports.registerDB = async (fordata) => {
    const { userid, username, email, password, conpassword } = fordata;
      if (userid.length < 6 || userid.length > 20) {
        return {
          success: false,
          message: "ID 양식에 적합하지 않습니다.",
        };
      }

      if (password.length < 4) {
        return {
          success: false,
          message: "비밀번호는 최소 4자 이상 입력해주세요.",
        };
      }
      if (password !== conpassword) {
        return {
          success: false,
          message: "비밀번호가 일치 하지 않습니다.",
        };
      }

      const select = `select * from t_user where userid = ?`;
      connection = await pool.getConnection();

      const [user] = await connection.query(select, userid);
      await connection.beginTransaction();

      if (user.length > 1) {
        return {
          success: false,
          message: "이미 존재하는 아이디 입니다.",
        };
      }
      const passing = await bcrypt.genSaltSync(saltnum);
      const passingPw = await bcrypt.hashSync(password, passing);

      const insertSql = `INSERT INTO t_user (userid, name , email, password) values (? , ? , ?, ?)`;
      const insert = [userid, username, email, passingPw];
      await connection.query(insertSql, insert);
      await connection.commit();
      await connection.release();

      return {
        success: true,
        message: "회원가입이 완료되었습니다.",
    }
  },

  exports.trainers = async (fordata, user) => {
    console.log(fordata)
      const { nickname, annual, certificate, school, prize, today, say } =fordata;
      connection = await pool.getConnection();
      const checkSelect = "select * from t_Trainers where id = ?";
      const [unuser] = await connection.query(checkSelect, user);
      console.log(unuser.length)

      if (unuser.length > 1) {
        return {
          success: false,
          message: "이미 존재하는 트레이너 입니다.",
        };
      }

      const [[tokenuser]] = await connection.query(
        `SELECT * FROM t_user WHERE id = ${connection.escape(user)}`
      );
      console.log(tokenuser)

      const insert =
        "INSERT INTO t_Trainers (id, T_nickname, T_Annual, T_today, T_say, T_school, T_prize, T_certificate) value(?,?,?,?,?,?,?,?)";
      await connection.query(insert, [
        `${tokenuser.id}`,
        nickname,
        annual,
        today,
        say,
        school,
        prize,
        certificate,
      ]);
      await connection.commit();
      await connection.release();

      return {
        success: true,
        message: "트레이너 등록이 완료되었습니다.",
      };
  },


  exports.trainersImg = async (user ,url1, url2) => {
    connection = await pool.getConnection();

    const [imageUser] = await connection.query(
      `SELECT * FROM trainer_photo WHERE img_id = ${connection.escape(
        user.id
      )}` 
    );
        
    if(imageUser.length  > 3) {
      return {
        success : false,
        message : '이미지가 이미 2장 존재합니다.'
      }
  }      
  
    const imgselect = 'select * from trainer_photo where type=1 and img_id =?' 

    const [type1] = await pool.query(imgselect, user.id);

    if(type1.length > 0) {
      return {
        success : false,
        message : '이미 메인 사진이 존재합니다.'
      }
    }


    const insert = 'insert into trainer_photo (img_id, phto1, type) values ?';

      const value = [ 
        [user.id, url1, 1],
        [user.id,  url2, 2]
      ] 

      await connection.query(insert, [value] );
      await connection.release();
      
      return {
        success : true,
        message : '이미지가 등록 완료 되었습니다.'
      }
}


  exports.story = async () => {
      connection = await pool.getConnection()
      const select = 'select t1.story_image, t1.Title, t1.story_con , t1.story_id , t1.id from story t1, t_user t2  where t1.story_id = t2.id  '
      const [user] =  await connection.query(select)
      await connection.release()
      return {
        success : true,
        message : user 
      }
  },

  exports.storydetailDb = async (num) => {
    connection = await pool.getConnection();

    const query = "select * from story  where id = ? ";
    const [[selectUser]] = await connection.query(query, num);
    await connection.release();

    return {
      success: true,
      results: selectUser,
    };
},

  exports.photo = async () => {
      connection = await pool.getConnection()

      const select =
      "select * from t_Trainers t1 , trainer_photo t2 where t1.id = t2.img_id and type= 1;";

     connection = await pool.getConnection();
     const [user] = await connection.query(select);
     await connection.release();
     return {
       success : true,
       results : user
     }
  },

 


  exports.photodetailDb = async (num) => {
    connection = await pool.getConnection();

    const query = "select t2.phto1,t1.T_school, t1.T_prize, t1.T_certificate, t1.T_say, t1.T_nickname, t1.T_today from t_Trainers t1 , trainer_photo t2 where t1.id = t2.img_id and t1.id = ?";
    const [[selectUser]] = await connection.query(query, num);
    await  connection.release();
    return {
      success : true,
      results : selectUser

    }
  },


  exports.FikaDb =  async (file, data, user) => {
        const fileUrl = file
        const { title, story_con } = data
        connection = await pool.getConnection();
        const insert = 'insert into story (story_id, Title, story_con, story_image) value (?, ?, ?, ?)'

        await connection.query(insert, [`${user.id}`, title, story_con, fileUrl ])
        await connection.commit()

        return {
          success : true,
          message : '이미지 등록이 완료되었습니다.'
        }
    }

