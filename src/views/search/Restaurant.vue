<template>
  <ResultCard
    v-for="restaurant of displayList"
    :key="restaurant.id"
    :cardData="restaurant"
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
      restaurantList: [],
    };
  },
  computed: {
    displayList() {
      return this.restaurantList.slice(0, 10);
    },
  },
  methods: {
    getCityRestaurant(city) {
      getApi
        .getCityRestaurant(city)
        .then((res) => (this.restaurantList = res.data));
    },
  },
  created() {
    let searchCity = this.$route.params.cityLink;
    this.getCityRestaurant(searchCity);
  },
};
</script>
