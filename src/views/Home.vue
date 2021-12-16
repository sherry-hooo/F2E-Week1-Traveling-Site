<template>
  <main class="home">
    <div class="main_bg"></div>
    <!-- 大banner -->
    <section class="banner_area">
      <img
        class="slogan"
        src="@/assets/img/slogan.svg"
        alt="368個鄉鎮市區 總有一個你的菜,這次想去哪裡鴨？"
      />
      <Menu />
      <figure>
        <img
          class="blackDuck"
          alt="black-duck"
          src="@/assets/img/black-duck.svg"
        />
        <img class="whiteDuck" alt="white-duck" src="@/assets/img/哪裡鴨.svg" />
      </figure>
    </section>
    <!-- 台灣地圖區 -->
    <section class="map_area">
      <div class="map_area_description">
        <p class="title">
          <img src="@/assets/img/找個沒去過的.svg" />
        </p>
        <div class="cityLink_buttons">
          <button
            v-for="district of districts"
            :key="district.id"
            class="district"
            :data-name="district"
            @mouseenter="hoverDistrict(district)"
          >
            {{ district }}
          </button>
        </div>
        <!-- city列表 -->
        <ul class="cities_group">
          <City
            v-for="city of displayedCities"
            :key="city.id"
            :city="city"
            data-city="city.id"
            :class="{ hoverCity: city.id === hoveredArea }"
          ></City>
        </ul>
      </div>
      <!-- 台灣地圖 -->
      <figure class="Taiwan">
        <TaiwanMap
          :hoveredDistrict="hoveredDistrict"
          @hoveredArea="receiveHoveredArea"
        />
      </figure>
    </section>
  </main>
</template>

<script>
import citiesList from "@/assets/data/citiesList.json";
import City from "../components/City.vue";
import TaiwanMap from "../components/TaiwanMap.vue";
// import BlackDuck from "../components/BlackDuck.vue";
import Menu from "../components/Menu.vue";

export default {
  name: "Home",
  components: {
    Menu,
    TaiwanMap,
    City,
  },
  data() {
    return {
      showAll: false,
      chosedCity: "請選擇縣市",
      hoveredArea: "",
      hoveredDistrict: "",
      districts: ["北部", "中部", "南部", "東部", "離島"],
    };
  },
  computed: {
    citiesList() {
      return citiesList;
    },
    displayedCities() {
      return citiesList.filter(
        (city) => city.district === this.hoveredDistrict
      );
    },
  },
  methods: {
    hoverDistrict(districtName) {
      this.hoveredDistrict = districtName;
    },
    receiveHoveredArea(cityName) {
      this.hoveredArea = cityName;
    },
    reportWindowSize(event) {
      console.log(event.target.innerWidth);
    },
  },
  mounted() {
    window.addEventListener("resize", this.reportWindowSize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.reportWindowSize);
  },
};
</script>

<style lang="scss" scoped>
// main layout
main {
  overflow: hidden;
  padding-bottom: 50vh;
  .main_bg {
    position: fixed;
    z-index: -1;
    top: 70px;
  }
  .banner_area {
    box-sizing: content-box;
    height: calc(100vh - 70px);
  }
  .map_area {
    box-sizing: content-box;
    height: calc(100vh - 70px);
  }
}

// fixed 背景
.main_bg {
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 70px);
  background: url("../assets/img/Main-Banner-Mask.png");
  background-repeat: no-repeat;
  background-size: cover;
}
// banner
.banner_area {
  box-sizing: border-box;
  width: 100%;
  padding: 40px 0 240px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: start;
  position: relative;
  z-index: 0;

  .slogan {
    align-self: center;
    width: 40%;
    z-index: 0;
    align-self: flex-start;

    @include breakpoint.mobile {
      width: 60%;
      align-self: center;
    }
  }

  figure {
    width: 100%;
    text-align: end;
    position: absolute;
    z-index: -1;
    bottom: 0;
  }
}

// 台灣地圖區
.map_area {
  color: black;
  font-size: 12px;
  padding: 70px 20px 40px;

  display: block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @include breakpoint.tablet {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    padding: 70px 20px 0;
  }
  .Taiwan {
    width: 100%;
    height: calc(80vh - 70px);
    transform: translateX(-50px);
    > svg {
      width: 100%;
      height: 100%;
    }
    @include breakpoint.desktop {
      flex: 1 1 60%;
      width: 60%;
      transform: none;
    }
  }
  &_description {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    @include breakpoint.tablet {
      flex: 1 1 40%;
      width: 40%;
    }
    .title {
      box-sizing: content-box;
      width: 50%;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      img {
        width: 100%;
      }
      @include breakpoint.desktop {
        width: 50%;
      }
    }
    .cityLink_buttons {
      width: 100%;
      margin-bottom: 50px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .district {
        aspect-ratio: 1;
        width: 50px;
        height: 50px;
        border: 3px solid #3b6c85;
        border-radius: 50%;
        margin: 5px;
        background: #3b6c85;
        color: white;
        font-weight: 700;
        font-size: 16px;
        transition: all 0.5s;
        &:hover {
          background: none;
          color: #3b6c85;
          transition: all 0.5s;
        }
        @include breakpoint.mobile {
          font-size: 20px;
          width: 80px;
          height: 80px;
        }
        @include breakpoint.tablet {
          font-size: 20px;
          width: 80px;
          height: 80px;
        }
      }
    }
  }
}

// cities 縣市列表
.cities_group {
  padding: 0 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @include breakpoint.tablet {
    flex-direction: column;
    width: 100%;
  }
  a {
    width: fit-content;
    margin: 10px;
  }
}

// hover effect
.hoverCity {
  background-color: orange;
}

// menu
::v-deep .menu {
  width: 80%;
  flex-direction: column;
  margin-top: 40px;
  justify-content: flex-start;

  .dropDown_menu {
    width: 80%;
    height: 60px;
    padding: 20px 30px;
    border-radius: 24px;
    background: #ffffff;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    .toggle_icon {
      width: 16px;
      pointer-events: none;
    }
  }
  .dropDown_select {
    border: 1px solid black;
    border-radius: 24px;
    width: 80%;
    top: 80px;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: fit-content;
  }
  .search_button {
    width: 80%;
    height: 60px;
    border-radius: 24px;
    outline: none;
    background: url(/img/放大鏡.e619c7da.svg) bottom 50% left 70% / 30px 40px
        no-repeat,
      #f79c31;
    text-align: center;

    &:hover {
      box-shadow: -2px 4px 4px #6d6c6c;
      transform: translate(1px, -1px);
      transition: all 0.3s;
    }
  }
}

// 鴨子動畫
.blackDuck {
  animation: walking 5s linear infinite alternate;
}
.whiteDuck {
  animation: walking 5s 0.1s linear infinite alternate;
}

@keyframes walking {
  0% {
    transform: translateX(-10px);
  }
  45% {
    transform: translateX(-50px);
  }
  50% {
    transform: scaleX(-1) translateX(50px);
  }
  100% {
    transform: scaleX(-1) translateX(0px);
  }
}

@keyframes return {
  0% {
    transform: scaleX(-1);
  }
  100% {
    transform: scaleX(-1);
  }
}
</style>
