<template>
  <main class="description" v-if="siteInfo">
    <button class="goLastPage_btn" @click="backLastPage">
      <i class="fas fa-arrow-left"></i>
    </button>
    <section class="detail_des">
      <article class="site_info_detail">
        <h3>{{ name }}</h3>
        <p v-if="siteInfo.DescriptionDetail || siteInfo.Description">
          {{ siteInfo.DescriptionDetail || siteInfo.Description }}
        </p>
      </article>
    </section>
    <section class="info_des">
      <ul class="info_des_group">
        <h4 class="info_des_group_title">{{ name }}</h4>
        <li class="info_des_group_content" v-if="siteInfo.Address">
          <img src="@/assets/img/location.svg" alt="地址圖示" />
          <p>{{ siteInfo.Address }}</p>
        </li>
        <li class="info_des_group_content" v-if="siteInfo.Phone">
          <img src="@/assets/img/phone.svg" alt="電話圖示" />
          <a href="tel:">{{ siteInfo.Phone }}</a>
        </li>
        <li class="info_des_group_content" v-if="siteInfo.OpenTime">
          <img src="@/assets/img/time.svg" alt="時間圖示" />
          <p>{{ siteInfo.OpenTime }}</p>
        </li>
        <li class="info_des_group_content" v-if="siteInfo.TicketInfo">
          <img src="@/assets/img/money.svg" alt="收費圖示" />
          <p>{{ siteInfo.TicketInfo }}</p>
        </li>
        <li class="info_des_group_content" v-if="siteInfo.Remark">
          <img src="@/assets/img/edit.svg" alt="編輯圖示" />
          <p>
            {{ siteInfo.Remark }}
          </p>
        </li>
        <li class="info_des_group_content" v-if="siteInfo.ServiceInfo">
          <img src="@/assets/img/edit.svg" alt="編輯圖示" />
          <p>
            {{ siteInfo.ServiceInfo }}
          </p>
        </li>
        <li class="info_des_group_content" v-if="siteInfo.Spec">
          <img src="@/assets/img/edit.svg" alt="編輯圖示" />
          <p>
            {{ siteInfo.Spec }}
          </p>
        </li>
        <li class="info_des_group_content" v-if="siteInfo.ParkingInfo">
          <img src="@/assets/img/edit.svg" alt="編輯圖示" />
          <p>
            {{ siteInfo.ParkingInfo }}
          </p>
        </li>
      </ul>
    </section>
    <section class="route_info">
      <iframe :src="googleMap" frameborder="0" allowfullscreen></iframe>
      <div>
        <p class="title">交通資訊</p>
        <p v-if="siteInfo.TravelInfo">
          {{ siteInfo.TravelInfo }}
        </p>
      </div>
    </section>
  </main>
</template>

<script>
// import Thumbnail from "@/components/Thumbnail.vue";
import getApi from "@/services/getApi.js";

export default {
  components: {},
  props: ["name", "id", "cityLink", "category"],
  data() {
    return {
      siteInfo: { Picture: null },
      distance: 5000,
      nearByRestaurants: [],
      nearByHotels: [],
      nearBySites: null,
      googleMap: "",
    };
  },
  computed: {
    picture1() {
      return this.siteInfo.Picture && this.siteInfo.Picture.PictureUrl1
        ? `url(${this.siteInfo.Picture.PictureUrl1})`
        : `url('${require("@/assets/img/replacedImg1.jpg")}')`;
    },
    picture2() {
      return this.siteInfo.Picture && this.siteInfo.Picture.PictureUrl2
        ? `url(${this.siteInfo.Picture.PictureUrl2})`
        : `url('${require("@/assets/img/replacedImg1.jpg")}')`;
    },
  },

  methods: {
    getScenicSpot(city, id) {
      return getApi.getScenicSpot(city, id).then((res) => {
        this.siteInfo = res.data[0];
        return res.data[0].Position;
      });
    },
    getHotel(city, id) {
      return getApi.getHotel(city, id).then((res) => {
        this.siteInfo = res.data[0];
        return res.data[0].Position;
      });
    },
    getRestaurant(city, id) {
      return getApi.getRestaurant(city, id).then((res) => {
        this.siteInfo = res.data[0];
        return res.data[0].Position;
      });
    },
    getNearRestaurant(lat, lon, distance) {
      return getApi
        .getNearRestaurant(lat, lon, distance)
        .then((res) => (this.nearByRestaurants = res.data));
    },
    getNearSites(lat, lon, distance) {
      return getApi
        .getNearSites(lat, lon, distance)
        .then((res) => (this.nearBySites = res.data));
    },
    getNearHotel(lat, lon, distance) {
      return getApi
        .getNearHotel(lat, lon, distance)
        .then((res) => (this.nearByHotels = res.data));
    },
    getGoogleMap(positionLat, positionLon) {
      let googleMapAddress = `https://maps.google.com/maps?q=${positionLat},${positionLon}&z=16&output=embed`;
      this.googleMap = googleMapAddress;
    },
    backLastPage() {
      console.log("push");
      this.$router.push({ name: "Search" });
    },
  },
  async created() {
    let position;
    switch (this.category) {
      case "ScenicSpot":
        position = await this.getScenicSpot(this.cityLink, this.id);
        break;
      case "Restaurant":
        position = await this.getRestaurant(this.cityLink, this.id);
        break;
      case "Hotel":
        position = await this.getHotel(this.cityLink, this.id);
        break;
    }

    this.getGoogleMap(position.PositionLat, position.PositionLon);
  },
  beforeRouteUpdate(to) {
    console.log("jump");
    let nextId = to.params.id;
    let nextCity = to.params.city;
    if (nextId.startsWith("C4")) {
      this.getHotel(nextCity, nextId);
    } else {
      this.getRestaurant(nextCity, nextId);
    }
  },
};
</script>

<style lang="scss" scoped>
main {
  position: relative;
  .detail_des {
    height: calc(100vh - 70px);
  }
  .info_des {
    height: 100vh;
  }
  .route_info {
    height: 100vh;
  }
}

.detail_des {
  background: v-bind(picture1), white;
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100%;
  background-attachment: fixed;
  overflow: scroll;
  article {
    width: 100%;
    height: 50%;
    padding: 30px 5px;
    h3 {
      @extend %main-title;
      box-sizing: border-box;
      background: transparent;
      width: 100%;
      height: fit-content;
      padding: 0 40px;
      color: black;
      font-weight: 900;
      text-align: center;
    }
    p {
      @extend %content;
      padding: 10px;
      line-height: 2;
      background: #ffffff69;
      backdrop-filter: blur(15px);
      &::first-letter {
        font-size: 30px;
        font-weight: 500;
      }
    }
  }

  @include breakpoint.tablet {
    background-size: 50%;
    background-position: center left;
    article {
      width: 50%;
      height: 100%;
      padding: 30px;
      margin-left: auto;
      p {
        padding: 20px 25px;
      }
    }
  }
}
.info_des {
  background: v-bind(picture2), orange;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 50%;
  background-attachment: fixed;
  display: flex;
  &_group {
    background: orange;
    width: 100%;
    height: 50%;
    padding: 10px 20px;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &_title {
      @extend %sub-title;
      color: black;
      margin-bottom: 30px;
    }
    &_content {
      @extend %content;
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
      img {
        width: 20px;
        padding-top: 2px;
        margin-right: 10px;
        + * {
          color: black;
          // font-size: 20px;
          // font-weight: 500;
        }
      }
    }
  }
  @include breakpoint.tablet {
    margin: 0;
    background-size: 50% 60%;
    background-position: center right;
    ul {
      width: 50%;
      height: 100%;
      margin-right: auto;
    }
  }
}
.route_info {
  background: white;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  iframe {
    width: 100%;
    height: 100%;
  }
  div {
    @extend %content;
    width: 100%;
    height: 100%;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  @include breakpoint.tablet {
    flex-direction: row;
    justify-content: left;

    iframe {
      width: 50%;
      height: 100%;
    }
    div {
      width: 50%;
      height: 100%;
    }
  }
}

// 回上一頁button
.goLastPage_btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: black;
  border: 1px solid black;
  cursor: pointer;
  opacity: 0.1;

  position: absolute;
  top: 5px;
  left: 15px;
  i {
    color: white;
    font-size: 20px;
  }
  &:hover {
    opacity: 0.7;
    i {
      animation: pointingLeft 0.8s infinite alternate;
    }
  }
  @include breakpoint.tablet {
    width: 50px;
    height: 50px;
    top: 15px;
    left: 15px;
    i {
      font-size: 30px;
    }
  }
}

@keyframes pointingLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-3px);
  }
}
</style>
