<template>
         <div class="mt-5"> 
            <div class="container">
                <div class="mb-3 row">
            <div class="col-md-9">
              <div class="mb-3 row">
            <label class="col-md-3 col-form-label">사진</label>
            <div class="col-md-9">
                <input class="form-control" type="file"   @change="uploadImage" id="image2" ref="image2" name="upload" accept="image/png,image/jpeg"  >
                <img v-if="preview" :src="preview" id="preview"  width="300" height="250">
                <div class="alert alert-secondary" role="alert">
                    <ul>
                        <li>최대 5개 가능</li>
                        <li>이미지 사이즈 : 700 * 700</li>
                        <li>파일 사이즈 : 1M 이하</li>
                        <li>파일 확장자 : png, jpg만 가능</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="mb-3 row">
            <label class="col-md-3 col-form-label">사진</label>
            <div class="col-md-9">
                <input class="form-control" type="file" id="image3" ref="image3" @change="uploadImage2" name="suupload" accept="image/png,image/jpeg" >
                <img v-if="preview2" :src="preview2" width="300" height="250">
                <div class="alert alert-secondary" role="alert">
                    <ul>
                        <li>파일 사이즈 : 5M 이하</li>
                        <li>파일 확장자 : png, jpg만 가능</li>
                    </ul>


                </div>
            </div>
        </div>
  
        <div class="mb-3 row">
            <div class="col-6 d-grid p-1">
                <button type="button" class="btn btn-lg btn-dark" onclick="history.go(-1) ">취소하기</button>
            </div>
            <div class="col-6 d-grid p-1">
                <button type="button" class="btn btn-lg btn-danger" @click="signUP" >저장</button>
            </div>
        </div>
    </div>
</div>
            </div>
         </div>
</template>


<script>
import actions from '../actions'

export default {
    data () {
        return {
            images : '',
            image : '',
            preview : null,
            preview2: null,
            
        }
    },
 
    methods : {
        uploadImage : function(event) {
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
        uploadImage2: function(event) {
            var input = event.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                this.preview2 = e.target.result;
                }
                this.image=input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },
        signUP : async function () {
            try {
          
            const form = new FormData()
            const image = this.$refs['image2'].files[0]
            const image2 = this.$refs['image3'].files[0]
            console.log(image)
            
            if(!image || !image2 ) {
              return  alert('사진을 등록해주세요')
            }
            form.append('upload', image)
            form.append('suupload', image2)
            
            const respons = await actions.trainerImage({ data: form, extraHeaders: { 
                'Content-Type': 'multipart/form-data',
            }});            

                if(respons.success === false) {
                    alert(respons.message)
                    window.location.assign('/photo/trainersImg')
                }
                if(respons.success === true) {
                    alert(respons.message)
                    window.location.assign('/photo')
                }


        }catch(e) {
            console.log(e)
        }
    }
         
    }
}
</script>
