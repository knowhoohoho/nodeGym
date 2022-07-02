<template>

  <main class="mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-10">
          <div class="row row-cols-1 row-cols-md-3 g-6">
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                  <div :class="carousel-item">
                    <img :src="photo.phto1" class="d-block w-100" alt="..." />
                  </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                      data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                      data-bs-slide="next">
                      <span class="carousel-co ntrol-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </button>
              </div>
            </div>
            <div class="card" style="width: 45em">
              <div class="card-body" style="text-align: center">
                <h5 class="card-title">
                  {{photo.T_nickname}}
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">
                  {{photo.T_today}}
                </h6>
                <p class="card-text">
                  학력 :{{photo.T_school}}
                </p>
                <p class="card-text">
                 수상 경력:{{photo.T_prize}}
                </p>
                <p class="card-text">
                자격증 :{{photo.T_certificate}}
                </p>
                <a href="/consult" class="card-link">상담하기</a>
                <a href="#" class="card-link">찜</a>
              </div>
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
             defaultUrl: 'http://localhost:4000/',
             photodetail : {},
             photo: [],
             photoId : 0, 

        }
    },
    mounted() {
        this.photoId = this.$route.query.id,
        this.detailPhoto()
        
    },
    methods : {
       async detailPhoto() {
           try {
               const response = await actions.detailPhoto({data:[this.photoId]})
               console.log(response)
               this.photo = response.results


           }catch (e) {
               console.log(e)
           }
           
        }
    }

}
</script>