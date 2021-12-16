<template>
  <div class="citySlider">
  <h4>本月進行中活動</h4>
    <swiper
      :slidesPerView="1"
      :spaceBetween="30"
      :loop="true"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      class="mySwiper"
    >
      <swiper-slide v-for="activity in activityList" :key="activity.id">
        <p class="activity_title">{{ activity.ActivityName }}</p>
        <img
          :src="activity.Picture.PictureUrl1"
          :alt="activity.Picture.PictureDescription1"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import getApi from "@/services/getApi.js";
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default {
  components: { Swiper, SwiperSlide },
  data() {
    return {
      cityLink: this.$route.params.cityLink,
      activityList: [],
    };
  },
  computed: {},
  methods: {
    getCityActivity(city, month) {
      getApi
        .getCityActivity(city, month)
        .then((res) => (this.activityList = res.data));
    },
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
  },
  created() {
    const currentMonth = new Date().getMonth() + 1;
    getApi
      .getCityActivity(this.cityLink, currentMonth)
      .then((res) => (this.activityList = res.data));
    let searchCity = this.$route.params.cityLink;
    this.getCityActivity(searchCity, currentMonth);
  },
};
</script>

<style lang="scss" scoped>
.citySlider {
  background: green;
  width: 100%;
  height: 500px;
}
</style>
