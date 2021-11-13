import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import search from '../views/Search.vue'
import description from '../views/Description.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/search/:cityLink',
    name: 'search',
    props: true,
    component: search,
  },
  {
    path: '/search/:cityLink/:name/:id',
    name: 'description',
    props: true,
    component: description,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
