<template>
  <router-link
    :to="{
      name: 'description',
      params: {
        id: restaurant.ID,
        name: restaurant.Name,
        cityLink: cityLink,
        city: cityLink,
      },
    }"
  >
    <div class="thumbnail">
      <img
        v-if="restaurant.Picture && restaurant.Picture.PictureUrl1"
        alt="restaurant.Picture.PictureDescription1"
        :src="restaurant.Picture.PictureUrl1"
      />
      <img v-else src="@/assets/img/replacedImg.png" alt="" />
      <p>{{ restaurant.Name }}</p>
    </div>
  </router-link>
</template>
<script>
import citiesList from '@/assets/data/citiesList.json'

export default {
  name: 'thumbnail',
  props: ['restaurant'],
  data() {
    return {
      itemImg: require(`@/assets/img/replacedImg.png`),
    }
  },
  computed: {
    cityLink() {
      return citiesList.find((city) => city.cityName === this.restaurant.City)
        .cityLink
    },
  },
  // computed: {
  //   itemImg() {
  //     if (this.restaurant.Picture === undefined) {
  //       return require('@/assets/replacedImg.png')
  //     } else {
  //       return `url(${this.item.Picture.PictureUrl1})`
  //       // return require(`url(@/assets/replacedImg.png)`)
  //     }
  //   },
  // },
}
</script>

<style lang="scss" scoped>
.thumbnail {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  flex-shrink: 0;

  font-weight: 600;
  color: rgb(43, 41, 41);
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  margin: 20px;

  img {
    width: 100%;
    height: 100%;
    opacity: 0.5;
    border-radius: 24px;
    object-fit: cover;
    object-position: center;
    transition: all 0.5s;

    &:hover {
      opacity: 1;
      transform: scale(1.2);
      z-index: 1;
      transition: all 0.5s;
    }
  }
  p {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    font-weight: 900;
    transition: all 0.5s;

    &:hover {
      z-index: -1;
      transition: all 0.5s;
    }
  }
}
</style>
