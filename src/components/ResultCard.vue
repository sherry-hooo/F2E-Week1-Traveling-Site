<template>
  <router-link
    class="card"
    :to="{
      name: 'description',
      params: {
        id: cardData.ID,
        cityLink: cityLink,
        name: cardData.Name,
        category: $route.name,
      },
    }"
  >
    <div class="myCard">
      <div class="myCard_thumbnail">
        <img
          v-if="cardData.Picture.PictureUrl1"
          :src="cardData.Picture.PictureUrl1"
          :alt="cardData.Picture.PictureUrl1PictureDescription1"
        />
        <img v-else src="@/assets/img/replacedImg1.jpg" alt="替代圖片" />
      </div>
      <div class="myCard_body">
        <h4>{{ cardData.Name }}</h4>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ResultCard",
  props: ["cardData", "cityLink", "index"],
  data() {
    return {};
  },
  methods: {
    testScroll() {},
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/components/_card.scss";
@use "@/assets/scss/components/_animation.scss";

.loadingCard {
  .myCard_thumbnail {
    @extend %wave_loading;
  }
  .myCard_body {
    @extend %wave_loading;
  }
}
</style>
