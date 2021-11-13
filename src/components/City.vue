<template>
  <router-link
    :to="{
      name: 'search',
      params: { cityName: city.cityName, cityLink: city.cityLink },
    }"
  >
    <div class="city_thumbnail">
      {{ city.cityName }}
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'city',
  props: ['city'],
  data() {
    // const image = require(`@/assets/${this.city.image}`);
    // console.log(`url(${image})`)
    return {
      events: null,
      // cityImg: `url('${image}')`,
    }
  },
}
</script>

<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.city_thumbnail {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  border-radius: 24px;

  font-weight: 600;
  color: white;
  // background-image: v-bind(cityImg);
  background-color: #91b4c6;
  background-repeat: no-repeat;
}
</style>
