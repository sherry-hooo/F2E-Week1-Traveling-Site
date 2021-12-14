<template>
  <ResultCard
    v-for="hotel of displayList"
    :key="hotel.id"
    :cardData="hotel"
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
      hotelList: [],
    };
  },
  computed: {
    displayList() {
      return this.hotelList.slice(0, 10);
    },
  },
  methods: {
    getCityHotel(city) {
      getApi.getCityHotel(city).then((res) => (this.hotelList = res.data));
    },
  },
  created() {
    let searchCity = this.$route.params.cityLink;
    this.getCityHotel(searchCity);
  },
};
</script>
