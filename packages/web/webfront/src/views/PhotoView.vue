<template>

<main class="mt-5" >
    <div class="container">
          <a href="/trainers" style="text-decoration: none;" v-if="userIn">트레이너 등록&nbsp;&nbsp;&nbsp;&nbsp;</a>
          <a href="/photo/trainersImg" style="text-decoration: none;"  v-if="userIn">사진 등록</a>
         <div class="row" >
            <div class="col-lg-3 col-md-6 ">
              <div class="card mt-4 "  style="width: 18rem;"  v-for="img in userPhotoList" :key="img">
                <a @click="gotoDetail(img.img_id)" id="cardmain">
                  <img  :src="`${img.phto1}`" class="card-img-top" alt="">
                </a>
                <div class="card-body">
                  <h5 class="card-title">{{img.T_nickname}}</h5>
                  <p class="card-text">{{img.T_today}}</p>
                  <p class="card-text">{{img.T_say}}</p>
                </div>
              </div>
            </div>
      </div>

    </div>

</main>
    
    
</template>



<script>
import actions from '../actions'
export default {
    data() {
       return {
           defaultUrl: 'http://localhost:4000/photo',
           userPhotoList: [],
           userIn : []
       }
    },
    mounted() {
        this.PhotoList();
    },
    methods : {
      async PhotoList() {
            try {
              const respons = await actions.photoList({})
              console.log(respons)
              this.userPhotoList = respons.data.results;
              this.userIn = respons.data.user
            } catch (e) {
                console.log(e.response.data);

            }
         },

         gotoDetail(id) { 
            this.$router.push({path:'/photo/detail' , query:{id} })
        }

         
    }
       


}
</script>

<style>
 .cardmain {
   float: left;
 }
</style>