import { createRouter, createWebHashHistory } from 'vue-router'
import ToDO from '../components/ToDo.vue'

const routes = [
  {path:'/', component: ToDO}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
