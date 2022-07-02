import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LogintView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PhotoView from '../views/PhotoView.vue'
import StoryView from '../views/StoryView.vue'
import TrainersView from '../views/TrainersView.vue'
import TrianersimgView from '../views/TrianersimgView.vue'
import StoryfikaView from '../views/StoryfikaView.vue'
import PhotodetailView from '../views/PhotodetailView.vue'
import StorydetailVue from '../views/StorydetailVue.vue'
import IoView from '../views/IoView.vue'



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/user/login',
    name: 'login',
    component: LogintView
  },
  {
    path: '/user/register',
    name: 'register',
    component: RegisterView

  },
  {
    path: '/photo',
    name: 'photo',
    component: PhotoView,
  },
  {
    path: '/story',
    name: 'story',
    component: StoryView
  },
  {
    path: '/trainers',
    name: 'trainers',
    component: TrainersView
  },
  {
    path: '/photo/trainersImg',
    name: 'TrianersimgView',
    component: TrianersimgView
  },
  {
    path: '/story/Fika',
    name: 'StoryfikaView',
    component: StoryfikaView
  },
  {
    path: '/photo/detail',
    name: 'PhotodetailView',
    component: PhotodetailView
  },
  {
    path: '/story/detail',
    name: 'StorydetailVue',
    component: StorydetailVue
  },
  {
    path: '/consult',
    name: 'IoView',
    component: IoView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
