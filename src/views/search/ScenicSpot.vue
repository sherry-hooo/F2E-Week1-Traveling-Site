<template v-if="scenicSpotList">
  <ResultCard
    v-for="scenicSpot of displayList"
    :key="scenicSpot.id"
    :cardData="scenicSpot"
    :cityLink="$route.params.cityLink"
  ></ResultCard>
</template>

<script>
import ResultCard from "@/components/ResultCard.vue";
import getApi from "@/services/getApi.js";

export default {
  components: { ResultCard },
  data() {
    return {
      cityLink: this.$route.params.cityLink,
      scenicSpotList: [],
    };
  },
  computed: {
    displayList() {
      return this.scenicSpotList.slice(0, 10);
    },
  },
  methods: {
    getCityScenicSpot(city) {
      getApi
        .getCityScenicSpot(city)
        .then((res) => (this.scenicSpotList = res.data));
    },
  },
  created() {
    let searchCity = this.$route.params.cityLink;
    this.getCityScenicSpot(searchCity);
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
