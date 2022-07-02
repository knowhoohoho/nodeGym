const schema = require('validate');
var exports = (module.exports = {});



exports.login = new schema({
    "userid" : {
        type : String,
        required: true,
        length: { min: 2, max: 32 },
        message : '아이디 양식에 맞게 입력해주세요',

    },
    "password" : {
        type : String,
        required : true,
        message : '비밀번호 양식에 맞게 입력해주세요'
    }
})


const aa = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

exports.register = new schema({
    'userid' : {
        type : String,
        required : true,
        length : {min: 4 , max : 32},
        message : '아이디가 올바른 방식이 아닙니다.'
    },
    'username' : {
        type : String,
        required : true,
        length : {min:2 , max: 15},
        message : '올바른 닉네임을 사용해주세요'
    } ,
    'email' : {
        type : String,
        required : true,
        length : {min:4 , max:20},
        use :  aa,
        message : '이메일이 올바른 방식이 아닙니다.',
    },
     'password' : {
        type : String,
        required : true,
        message : '올바른 비밀번호 양식이 아닙니다.'
     },
    'conpassword' : {
        type : String,
        required : true,
        length : {min:5, max:20},
        message : '올바른 비밀번호 양식이 아닙니다.'
      }
})


exports.trainers = new schema({
    'nickname' : {
        type : String,
        required: true,
        length : {min:2, max:10},
        message : '트레이너 닉네임 방식이 올바르지 않아요'
    },
    'annual' : {
        type : Number,
        required : true,
        length : {min:0, max:4},
        message : '경력을 올바르게 적어주세요',
    },
    'certificate' : {
        type :String,
        required : true,
        message : '자격증을 올바르게 기입해주세요',
    },
    'school' : {
        type : String,
        required : false,
        message : '최종학력을 정확하게 입력해주세요',
    },
    'prize' : {
        type : String ,
        required : false,
        message : '수상경력을 정확하게 기입해주세요',
    },
    'today' : {
        type : String,
        required : false,
        length : {min:5, max :50},
        message : '한마디를 적어주세요'
    },
    'say' : {
        type : String,
        required : true,
        length : {min:3, max : 20},
        message : '짧게 한마디를 적어주세요'
    }

}),




exports.storyDetail = new schema({
    type : Array,
    required : true,
    message : '아니 아니 아니 아니야'
})


exports.fikaList = new schema({
    'title' : {
        type : String,
        required : true,
        length : {min:5 , max: 100},
    },

    'story_con' : {
        type : String,
        required : true,
        length : {min : 50 , max : 2500},
    },
})