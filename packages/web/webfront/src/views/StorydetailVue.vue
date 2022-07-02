<template>
    <div class="main">
        <div class="contailner mt-5">
            <div class="img" >
                <img :src="imglist.story_image" alt="" >
                <div class="title">
                    <h5>{{imglist.Title}}</h5>
                    <div class="content">
                        <textarea v-model="imglist.story_con" id="" cols="150" rows="10" >
                        </textarea>

                    </div>
                </div>

            </div>
        </div>

    </div>
</template>



<script>
import actions from '../actions'
export default {
    data() {
        return {
            imglist : [],
            imgId : 0,
        }
    },
    mounted()  {
        this.imgId = this.$route.query.id,
        this.viewStory()
        

    },
    methods : {
        async viewStory() {
           const response =  await actions.stroyDetail({data:[this.imgId]})
           console.log(response)
            this.imglist = response.results
        }
    }
}
</script>



<style>

 img {
     width: 300px;
  height: 150px;
  object-fit: cover;

 }

</style>