import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Raised from './views/Raised.vue'
import Admin from './views/Admin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/raised',
      name: 'Raised',
      component: Raised
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
