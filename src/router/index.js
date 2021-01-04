import Vue from 'vue'
import VueRouter from 'vue-router'
import artistas from '../views/artistas.vue'
import generos from '../views/generos.vue'
import utilizadores from '../views/utilizadores.vue'
import login from '../views/login.vue'
import videos from '../views/videos.vue'
import episodios from '../views/episodios.vue'
import dashboard from '../views/dashboard.vue'
import Home from '../views/Home.vue'
import store from '@/store/index'

Vue.use(VueRouter)

const ifAuthenticated = (to, from, next) => {
  if (store.state.isUserLoggedIn) {
    next()
    return
  }
  next('/')
}

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/generos',
    name: 'generos',
    component: generos,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/artistas',
    name: 'artistas',
    component: artistas,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/utilizadores',
    name: 'utilizadores',
    component: utilizadores,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/videos',
    name: 'videos',
    component: videos,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/episodios',
    name: 'episodios',
    component: episodios,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    beforeEnter: ifAuthenticated
  }/* 
  ,
    beforeEnter: ifAuthenticated,
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about"  '../views/About.vue')
  } */
]

const router = new VueRouter({
    mode: 'history',
  routes
})

export default router
