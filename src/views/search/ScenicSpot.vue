<template>
  <div class="search_content">
    <template v-if="isLoading">
      <LoadingCard v-for="loadingCard of 10" :key="loadingCard"></LoadingCard>
    </template>
    <ResultCard
      v-else
      v-for="(scenicSpot, index) of scenicSpotCardInfo"
      :key="scenicSpot.id"
      :cardData="scenicSpot"
      :index="index"
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
      scenicSpotList: [],
      currentPage: 1,
      cardsPerPage: 12,
      isLoading: true,
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.scenicSpotList.length / this.cardsPerPage);
    },
    scenicSpotCardInfo() {
      const firstIndex = this.cardsPerPage * (this.currentPage - 1);
      const lastIndex = this.cardsPerPage * this.currentPage;
      return this.scenicSpotList
        .map((scenicSpot) => ({
          ID: scenicSpot.ScenicSpotID,
          Name: scenicSpot.ScenicSpotName,
          Picture: scenicSpot.Picture,
        }))
        .slice(firstIndex, lastIndex);
    },
    cityLink() {
      return this.$route.params.cityLink;
    },
  },
  methods: {
    getAllScenicSpotByCity(city) {
      getApi
        .getAllScenicSpotByCity(city)
        .then((res) => (this.scenicSpotList = res.data))
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
    testScroll() {
      const cardContainer = document.querySelector(".search_content");
      console.log(cardContainer);
    },
  },
  created() {
    let searchCity = this.$route.params.cityLink;
    this.getAllScenicSpotByCity(searchCity);
  },
  watch: {
    cityLink() {
      this.isLoading = true;
      this.getAllScenicSpotByCity(this.cityLink);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .menu {
  justify-content: space-between;
  flex-direction: row;
  margin: 0 0 40px 0;
  .custom_select {
    flex: 1 1 70%;
  }
  .search_button {
    flex: 1 1 30%;
    background: url(/img/放大鏡.e619c7da.svg) top 30% left 90% / 15px 15px
        no-repeat,
      #f79c31;
    @media (min-width: 576px) {
      background: url(/img/放大鏡.e619c7da.svg) bottom 50% left 80% / 30px 40px
          no-repeat,
        #f79c31;
    }
  }
}
</style>
