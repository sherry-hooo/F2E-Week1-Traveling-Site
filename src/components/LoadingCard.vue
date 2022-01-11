<template>
  <a href="">
    <div class="myCard loadingCard">
      <div class="myCard_thumbnail">
        <img />
      </div>
      <div class="myCard_body">
        <h4></h4>
      </div>
    </div>
  </a>
</template>

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
