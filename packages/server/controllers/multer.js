const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const dotenv = require('dotenv');
var exports = module.exports = {};

dotenv.config()

const s3 = new aws.S3({ 
    accessKeyId :process.env.KEY,
    secretAccessKey: process.env.AKEY,
    region:process.env.REGION
  });


exports.files = multer ({
        storage: multerS3({
          s3: s3,
          bucket: 'testkwonho/trainer/',
          acl: 'public-read',
          contentType: multerS3.AUTO_CONTENT_TYPE,
          key: function (req, file, cb) {
            console.log(req.body)
            cb( null, Date.now() + "." + file.originalname.split(".").pop());
          },
          
        })
      }),

exports.single = multer ({
        storage: multerS3({
          s3: s3,
          bucket: 'testkwonho/story/',
          acl: 'public-read',
          contentType: multerS3.AUTO_CONTENT_TYPE,
          key: async  function (req, file, cb) {
            var ext = file.mimetype.split('/')[1];
            if(!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(ext)) {
              return cb(new Error('Only images are allowed'));
          }
            cb( null, Date.now() + "." + file.originalname.split(".").pop());
          },
        })
      })


  




  

