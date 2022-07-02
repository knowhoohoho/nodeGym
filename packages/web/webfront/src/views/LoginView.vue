<template>

<body>
  <div class="container mb-3 mt-5">
    <label for="exampleInputEmail1" class="form-label">아이디</label>
    <input type="text" class="form-control" name="userid" id="userid" v-model="userid" />
  </div>
  <div class="container mb-3">
    <label for="exampleInputEmail1" class="form-label">비밀번호</label>
    <input type="password" class="form-control" name="password" id="password" v-model="password" />
  </div>
  <div class="container mb-3">
    <button type="submit" class="btn btn-primary" @click="login">
      로그인
    </button>
  </div>
</body>


</template>



<script>
import actions from '../actions'

export default {
  methods : {
    login : async function () {      
        const user = {  
          userid : this.userid,
          password : this.password
        }
        if(!this.userid || !this.password < 0){
          alert('아이디 또는 비밀번호를 입력해주세요')
         return window.location.assign('/user/login')
        }
     const response = await actions.login({data:user})
     console.log(response)
      if(response.name === "Error") {
        alert(response.message)
     }

     console.log(response)
      if(response.success === false) {
        alert(response.message)
       return window.location.assign('/user/login')
      }
      if(response.success === true) {
        const token = response.token
        alert(response.message)
        localStorage.setItem('userlist', token); 
       return   window.location.assign('/')
      }
    }
  }
}


</script>
