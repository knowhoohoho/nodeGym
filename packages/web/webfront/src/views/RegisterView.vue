<template>
    
     <div class="container mb-3">
        <label for="exampleInputEmail1" class="form-label">아이디</label>
        <input type="text" class="form-control" id="userid" v-model="userid">
      </div>
      <div class="container mb-3">
        <label for="exampleInputEmail1" class="form-label">이름</label>
        <input type="text" class="form-control" id="username" v-model="username" >
      </div>
      <div class="container mb-3">
        <label for="exampleInputEmail1" class="form-label">이메일</label>
        <input type="email" class="form-control" id="email"  v-model="email"> 
      </div>
      <div class="container mb-3">
        <label for="exampleInputEmail1" class="form-label">비밀번호</label>
        <input type="password" class="form-control" id="password" v-model="password" >
      </div>
      <div class="container mb-3">
        <label for="exampleInputPassword1" class="form-label">비밀번호 확인</label>
        <input type="password" class="form-control" id="conpassword"  v-model="conpassword">
      </div>     
      <div class="container mb-3">
       <button type="button" class="btn btn-primary " @click="signup">회원가입</button>
      </div>
      

</template>



<script >
import actions from '../actions'

 export default {
   data() {
     return {
       userid : '',
       username : '',
       email : '',
       password : '',
       conpassword : '',
     }
   },
   methods : {
    signup : async function () {
    const user = {
         userid : this.userid,
         username : this.username,
         email : this.email,
         password : this.password,
         conpassword : this.conpassword 
       }
        if(user.userid.length < 0 ||  user.userid.length < 3) {
         return alert('아이디는 3글자 이상 입력해주세요')
        }

        if(user.username.length < 2 || user.username.length > 16 ) {
         return alert('이름은 최소 3글자 이상 최대 15자 미만으로 입력해주세요')
        }
         const re = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(user.email) {
        const aa = re.test(String(user.email).toLowerCase());
          if(!aa) {
          return  alert('이메일 형식을 올바르게 입력해주세요.')
          }
        }
         if(user.password.length < 4 || user.conpassword.length < 4) {
         return alert('비밀번호는 최소 4글자 이상입니다.')
        }
        if(user.password != user.conpassword) {
          return alert('비밀번호가 일치하지 않습니다.')
        }





     const response =  await actions.register({data :user })
     console.log(response)
     if(response.name === 'Error') {
       alert('response')
     }
      if(response.success === false) {
        alert(response.message)
       return window.location.assign('/user/register')
      }
      if(response.success === true) {
        alert(response.message)
       return window.location.assign('/')
      }

      }
   }
 }

</script>
