<template>
  <router-link
    class="city"
    :to="{
      name: 'Search',
      params: { cityLink: city.cityLink },
    }"
  >
    <div>
      {{ city.cityName }}
    </div>
    <!-- <p>{{ cityIntroduction }}</p> -->
  </router-link>
</template>

<script>
import citiesList from "@/assets/data/citiesList.json";

export default {
  name: "city",
  props: ["city"],
  data() {
    return {};
  },
  computed: {
    citiesList() {
      return citiesList;
    },
    cityIntroduction() {
      console.log(this.citiesList);
      return this.citiesList.find(
        (city) => city.cityName === this.city.cityName
      ).intro;
    },
  },
};
</script>

<style lang="scss" scoped>
.city {
  padding: 20px 10px;
  border-radius: 50%;
  border: 2px solid #91b4c6;
  background: white;
  font-weight: 500;
  color: rgb(80, 77, 77);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: orange;
    transition: all 0.3s ease-in-out;
    animation: bouncing 0.3s infinite alternate;
  }

  @include breakpoint.tablet {
    font-size: 20px;
    padding: 30px 15px;
  }
}

@keyframes bouncing {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-10px);
  }
}
</style>
