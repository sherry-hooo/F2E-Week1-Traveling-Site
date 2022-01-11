import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import citiesList from "@/assets/data/citiesList.json";
import ScenicSpot from "@/views/search/ScenicSpot.vue";
import Restaurant from "@/views/search/Restaurant.vue";
import Activity from "@/views/search/Activity.vue";
import Hotel from "@/views/search/Hotel.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/search/:cityLink",
    name: "Search",
    component: Search,
    props: (route) => ({
      cityLink: route.params.cityLink,
      cityName: citiesList.find(
        (city) => city.cityLink === route.params.cityLink
      ).cityName,
    }),
    redirect: { name: "ScenicSpot" },
    children: [
      {
        path: "ScenicSpot",
        name: "ScenicSpot",
        component: ScenicSpot,
      },
      {
        path: "Restaurant",
        name: "Restaurant",
        component: Restaurant,
      },
      {
        path: "Hotel",
        name: "Hotel",
        component: Hotel,
      },
      {
        path: "Activity",
        name: "Activity",
        component: Activity,
      },
    ],
  },
  {
    path: "/search/:category/:cityLink/:name/:id",
    name: "description",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Description.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
