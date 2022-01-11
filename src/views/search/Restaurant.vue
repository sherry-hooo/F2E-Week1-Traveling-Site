<template>
  <div class="search_content">
    <template v-if="isLoading">
      <LoadingCard v-for="loadingCard of 10" :key="loadingCard"></LoadingCard>
    </template>
    <ResultCard
      v-else
      v-for="restaurant of restaurantCardInfo"
      :key="restaurant.id"
      :cardData="restaurant"
      :cityLink="$route.params.cityLink"
    ></ResultCard>
  </div>
  <Pagination
    :totalPage="totalPage"
    @sentCurrentPage="getCurrentPage"
  ></Pagination>
</template>

<script>
import ResultCard from "@/components/ResultCard.vue";
import LoadingCard from "@/components/LoadingCard.vue";
import getApi from "@/services/getApi.js";
import Pagination from "@/components/Pagination.vue";

export default {
  components: { ResultCard, Pagination, LoadingCard },
  data() {
    return {
      cityLink: this.$route.params.cityLink,
      restaurantList: [],
      currentPage: 1,
      cardsPerPage: 12,
      isLoading: true,
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.restaurantList.length / this.cardsPerPage);
    },
    restaurantCardInfo() {
      const firstIndex = this.cardsPerPage * (this.currentPage - 1);
      const lastIndex = this.cardsPerPage * this.currentPage;
      return this.restaurantList
        .map((restaurant) => ({
          ID: restaurant.RestaurantID,
          Name: restaurant.RestaurantName,
          Picture: restaurant.Picture,
        }))
        .slice(firstIndex, lastIndex);
    },
  },
  methods: {
    getAllRestaurantByCity(city) {
      getApi
        .getAllRestaurantByCity(city)
        .then((res) => (this.restaurantList = res.data))
        .then(() =>
          setTimeout(() => {
            this.isLoading = false;
          }, 1000)
        );
    },
    getCurrentPage(data) {
      this.currentPage = data;
      this.scrollToTop();
      this.windowScrollToTop();
    },
    scrollToTop() {
      const element = document.querySelector(".search_content");
      element.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
      // 為什麼沒有用？
      // element.scroll({
      //   top: 0,
      //   left: 0,
      //   behavior: "smooth",
      // });
    },
    windowScrollToTop() {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  created() {
    let searchCity = this.$route.params.cityLink;
    this.getAllRestaurantByCity(searchCity);
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/components/_animation.scss";
</style>
