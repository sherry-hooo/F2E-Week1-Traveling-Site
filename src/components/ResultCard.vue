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
        <img v-else src="@/assets/img/replacedImg.png" alt="替代圖片" />
      </div>
      <div class="myCard_body">
        <h4>{{ cardData.Name }}</h4>
        <p class="info1">
          <img src="@/assets/img/location.svg" alt="" />
          <span v-if="cardData.Address">{{ cardData.Address }}</span>
          <span v-else>待更新</span>
        </p>
        <p class="info2">
          <img src="@/assets/img/time.svg" alt="" />
          <span v-if="cardData.OpenTime">{{ cardData.OpenTime }}</span>
          <span v-else>全日開放</span>
        </p>
        <p class="info3">
          <img src="@/assets/img/money.svg" alt="" />
          <span v-if="cardData.TicketInfo">{{ cardData.TicketInfo }}</span>
          <span v-else>不收費</span>
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ResultCard",
  props: ["cardData", "cityLink"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/components/_card.scss";
</style>
