const mysql = require('mysql2/promise');
require('dotenv').config()





  const  pool =  mysql.createPool ({
    host     : '127.0.0.1',
    user     : 'root',
    password :  'rnjsgh12',
    database : 'Testdb',
    connectionLimit : 30
  });
  
  

  


 
module.exports = pool;
