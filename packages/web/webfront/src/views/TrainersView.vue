<template>
       <main class="mt-5">
        <div class="container">
            <h2 class="text-center">트레이너 등록</h2>
            <div class="mb-3 row mt-3">
                <label class="col-md-3 col-form-label">트레이너 활동명</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" placeholder="이름" name="nickname" id="nickname" v-model="nickname" aria-describedby="basic-addon1">
                </div>
            </div>

            <div class="mb-3 row mt-3">
                <label class="col-md-3 col-form-label">경력</label>
                <div class="col-md-9">
                    <input type="number" class="form-control" placeholder="경력" name="career" id="annual"  v-model="annual" aria-describedby="basic-addon1">
                </div>
            </div>
            <div class="mb-3 row mt-3">
                <label class="col-md-3 col-form-label">자격증</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" placeholder="자격증" name="certificate" id="certificate"  v-model="certificate" aria-describedby="basic-addon1">
                </div>
            </div>
            <div class="mb-3 row mt-3">
                <label class="col-md-3 col-form-label">학교</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" placeholder="학교" name="school" id="school"  v-model="school" aria-describedby="basic-addon1">
                </div>
            </div>
            <div class="mb-3  row">
                <label class="col-md-3 col-form-label">수상경력</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" placeholder="수상경력" name="prize" id="prize"   v-model="prize">
                </div>
            </div>
            <div class="mb-3  row">
                <label class="col-md-3 col-form-label">한 줄평</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" placeholder="수상경력" name="say" id="say "  v-model="say" >
                </div>
            </div>
            <div class="mb-3 row mt-3">
                <label class="col-md-3 col-form-label">짧은 소개</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" placeholder="짧은 소개" name="today" id="today" aria-describedby="basic-addon1"  v-model="today">
                </div>
            </div>
            <div class="mb-3 row">
                <div class="col-6 d-grid p-1">
                    <button type="button" class="btn btn-lg btn-dark" onclick="history.back() ">취소하기</button>
                </div>
                <div class="col-6 d-grid p-1">
                    <button type="submit" class="btn btn-lg btn-danger" @click="Registration">저장하기</button>
                </div>
            </div>

        </div>
    </main>
</template>



<script>
    import actions from '../actions'


export default {
    data : function() {
         return  {
             nickname : '',
             annual : '',
             certificate : '',
             school : '',
             prize : '' ,
             say : '',
             todat : '',
         }
    },
    methods: {
       Registration : async function() {
           const user = {
               nickname : this.nickname,
               annual : this.annual,
               certificate : this.certificate,
               today : this.today,
               school : this.school,
               prize : this.prize,
               say  : this.say
           }
           const response =  await actions.trainer({ data :user})

           if(response.success === false) {
               alert(response.message)
              return window.location.assign('/photo')
           }
            alert(response.message)
            return window.location.assign('/photo')
       }
    }
}
        

</script>
