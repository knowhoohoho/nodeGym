<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
<nav class="navbar navbar-expand-lg navbar-light bg-light ">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">C.L.L.C</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">홈</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/story">후기</a>
          </li>
          <li class="nav-item ">
            <a class="nav-link " href="/photo" id="navbarDropdown" >P.T</a>
          </li>
        </ul>
        <form class="d-flex ml-4">
            <button v-if='user' @click="logout" style="width:50px flex">로그아웃</button>
            <a v-if='!user' href="/user/login" style="width:50px">로그인</a>
            <a v-if='!user' href="/user/register">회원가입</a>
        </form>
      </div>
    </div>
  </nav>
  <router-view/>
</template>


<script>

export default {
   data() {
       return  {
         user : localStorage.getItem('userlist')
       }
     },
     methods: {
         logout()  {
        localStorage.clear()
         alert('로그아웃 완료')
     }
     }
   

}

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
