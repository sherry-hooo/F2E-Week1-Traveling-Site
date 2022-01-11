<template>
  <div class="search_content">
    <template v-if="isLoading">
      <LoadingCard v-for="loadingCard of 10" :key="loadingCard"></LoadingCard>
    </template>
    <ResultCard
      v-for="hotel of hotelCardInfo"
      :key="hotel.id"
      :cardData="hotel"
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
import getApi from "@/services/getApi.js";
import Pagination from "@/components/Pagination.vue";
import LoadingCard from "@/components/LoadingCard.vue";

export default {
  components: { ResultCard, Pagination, LoadingCard },
  data() {
    return {
      cityLink: this.$route.params.cityLink,
      hotelList: [],
      currentPage: 1,
      cardsPerPage: 12,
      isLoading: true,
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.hotelList.length / this.cardsPerPage);
    },
    hotelCardInfo() {
      const firstIndex = this.cardsPerPage * (this.currentPage - 1);
      const lastIndex = this.cardsPerPage * this.currentPage;
      return this.hotelList
        .map((hotel) => ({
          ID: hotel.HotelID,
          Name: hotel.HotelName,
          Picture: hotel.Picture,
        }))
        .slice(firstIndex, lastIndex);
    },
  },
  methods: {
    getAllHotelByCity(city) {
      getApi
        .getAllHotelByCity(city)
        .then((res) => (this.hotelList = res.data))
        .then(() =>
          setTimeout(() => {
            this.isLoading = false;
          }, 1000)
        );
    },
    getCurrentPage(data) {
      this.currentPage = data;
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
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
    this.getAllHotelByCity(searchCity);
  },
};
</script>
