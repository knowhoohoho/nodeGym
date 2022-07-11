const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const pool = require("./DB/db");
const cors = require("cors");
const morgan = require('morgan')
const http = require('http');
dotenv.config();

const PORT = 4000






async function loadRoutes() {
  try {
      const routesDir = await fs.readdirSync(`${__dirname}/api-routes`);
      
      for (const path of routesDir) {
        const dirPath = `${__dirname}/api-routes/${path}`;
        const routes = await fs.readdirSync(dirPath);

        routes.forEach(async (file) => {
          const filename = require(`${dirPath}/${file}`);
          if (filename.middleware) {
            app[filename.method](
              filename.apiUrl,
              filename.middleware,
              filename.runner,
            );
          } else {
            app[filename.method](filename.apiUrl, filename.runner);
          }
      })
    }
    return ;
  }catch (e) {
    console.error(e)
  }
}

(async () => {
  app.set("view engine", "ejs");
  app.use(morgan('dev'))
  app.use(cookieParser());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const pathjoin = path.join(__dirname, "./public");
  const pathimage = path.join(__dirname, "./uploads");

  app.use(express.static(pathjoin));
  app.use(express.static(pathimage));
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Access-Token"
    );
    next();
  });

  app.use((req, res, next) => {
    try {
      req.dbPool = pool;
      // res.success = (data) => { 
      //   res.status(200).json({
      //     ...data
      //   })
        next();
      // }
    }catch (e){
      next(e)
    }
  });



  app.use(async (req, res, next) => {
    let connection;
      req.isLogin = false;
    try {
      const userToken = req.headers['access-token'];
      
      if (userToken.length > 5) {
        connection = await pool.getConnection();
        const tokenResult = await jwt.verify(userToken, 'Superkey')
        const [[tokenUser]] = await connection.query(
          `SELECT * FROM t_user WHERE id = ${connection.escape(tokenResult.u_id)}`
        );
        if (tokenUser) {
            req.userInfo = tokenUser
            req.isLogin = true;
        }
      }
    } catch (e) {
      next(e)
    } finally {
      if (connection) connection.release();
      next();
    }
  });

  await loadRoutes();

  app.use(function (err,req,res,next) {
    console.log('errorMessage', err.message)
     return res.status(200).json({
      results : false,
      message: err.message,
      name: err.name,
      status : 404,
    });
  });

  app.listen(PORT, () => {
    console.log(`Hello world  : ${PORT}` );
  });
})();