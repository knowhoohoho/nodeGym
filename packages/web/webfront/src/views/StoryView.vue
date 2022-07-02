<template>
     <main class="mt-5">
        <div class="container">
            <h3><a href="/story/Fika" v-if="userIn">글쓰기</a></h3>
            <div class="row g-3">
                <div class="col-lg-3 col-md-6"  v-for=" user in userStoryList" :key="user">
                    <div class="card" style="width: 18rem;"  >
                       <a @click="gotoDetail(user.id)"><img :src="`${user.story_image}`"  class="card-img-top" alt="..."></a> 
                        <div class="card-body">
                            <div class="card-title"></div>
                            <h6>{{user.Title}}</h6>
                            <p class="card-text">
                                <span class="">{{user.story_con}}</span>
                            </p>
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
           defaultUrl: '',
           userStoryList: [],
           userIn : []
       }
    },
    mounted() {
        this.StoryList();
    },
    methods : {
        async StoryList() {
            try{
                 this.defaultUrl = process.env.CLPORT
                 const response = await actions.story({}) 
                 console.log(response)
                 this.userStoryList = response.results
                 this.userIn = response.user
                 if(response.userIn === true) {
                     this.userIn = true
                 }
            } catch (e) {

                console.log(e)
            }
           
        },

        gotoDetail(id) { 
            this.$router.push({path:'/story/detail' , query:{id} })
        },
        storyFika(id) { 
            this.$router.push({path:'/story/Fika' , query:{id} })
        }
    }


}
</script>
