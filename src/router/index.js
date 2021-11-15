import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import description from '../views/Description.vue'
import citiesList from '@/assets/data/citiesList.json'

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
    // props: true,
    // component: search,

    props: (route) => ({
      cityLink: route.params.cityLink,
      cityName: citiesList.find(
        (city) => city.cityLink === route.params.cityLink,
      ).cityName,
      page: parseInt(route.params.page) * 2,
    }),
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Search.vue'),
  },
  {
    path: '/search/:cityLink/:name/:id',
    name: 'description',
    props: true,
    // component: description,
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Description.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
