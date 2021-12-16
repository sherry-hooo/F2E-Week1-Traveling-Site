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
  </router-link>
</template>

<script>
export default {
  name: "city",
  props: ["city"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.city {
  flex: 0 1 auto;
  padding: 20px 10px;
  border-radius: 50px;
  background: #91b4c6;
  font-weight: 500;
  color: rgb(80, 77, 77);

  &:hover {
    background: orange;
  }

  @media (min-width: 768px) {
    padding: 35px 20px;
    font-size: 20px;
  }
  @media (min-width: 992px) {
  }
}
</style>
