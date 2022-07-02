<template>
    <div class="main">
        <div class="container">  
            <div class="borad mt-4">
                <h4>글 작성</h4> 
                <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">제목</label>
                <input type="email" class="form-control" id="title" placeholder="title" v-model="title">
                </div>
                <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">본문</label>
                <textarea class="form-control" id="story_con" rows="10" placeholder="50자 이상 채워주세요"   v-model="story_con"></textarea>
                </div>
                 <div class="imgFile">
                 <img v-if="preview" :src="preview" width="300" height="250">  
                </div>
                <input type="file" name="SelectFile"  id="strory_image" ref="strory_image"  @change="fileselect"  accept="image/png,image/jpeg,image/pdf">
            </div>
               <div class="container mb-3 mt-5">
       <button type="button" class="btn btn-primary " @click="siginup">저장</button>
      </div>
        </div>  
    </div>

</template>



<script>
import actions from '../actions'

export default {
    data() {
        return {
            title : '',
            story_con : '',
            userNum  : 0,
            preview: '',
            images: '',
            
        }

    },
    methods : {
        fileselect : function (event) {
            var input = event.target;

            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                this.preview = e.target.result;
                }
                this.images=input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },

        siginup : async function() {
            try {
               if(this.title.length < 1 || this.story_con.length < 50 ){
                   window.alert('모든 내용을 입력해주세요!')
                    return false
               } 
                const image = this.$refs['strory_image'].files[0]
                if(!image) {
                    window.alert('사진을 넣어주세요')
                    return false
                }


          
            const form = new FormData()

            form.append('title', this.title)
            form.append('story_con', this.story_con)
            form.append('storyIg', image)


            const response = await actions.storyFika({data:form}, {
                 'Content-Type': 'multipart/form-data'
                 })

                if(response.name === 'Error') {
                    alert(' 확장자가  .png, .jpg and jpeg. 이미지 가능합니다! ')
                   return window.location.assign('/story/Fika')
                }

                console.log(response)

                 if(response.success === false) {
                     window.alert(response.message)
                     return false
                 }
                 if(response.success === true) {
                     alert(response.message)
                    return window.location.assign('/story')
                 }

                    
           
            }catch (e) {
                console.log(e)
            }
          
        }
    }
}
</script>

<style>
 #strory_image {
     margin-top: 5px;
 }
</style>