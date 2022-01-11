<template>
  <main class="home">
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
    <!-- 地圖區 -->
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
            :class="{
              hoverDistrict: this.hoveredDistrict === district,
            }"
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

  <footer>
    <p class="about">關於我們</p>
    <p>立志成為幫忙發現台灣之美的眼睛 幫您找出下一個旅遊景點</p>
    <div>
      <p>UI Design &colon; Rex Lai、Hooo.</p>
      <p>Web Design &colon; Hooo.</p>
    </div>
    <p class="copyright">
      Copyright &copy; 2021 要去哪裡鴨. All rights reserved.
    </p>
  </footer>
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
    reportWindowSize() {
      // console.log(event.target.innerWidth);
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
// home page layout
main {
  overflow: hidden;
  width: 100%;
  padding-bottom: 50px;
  background: url("../assets/img/Main-Banner-Mask.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

// banner
.banner_area {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: start;
  @include breakpoint.mobile {
    height: calc(100vh - 70px);
  }
  .slogan {
    align-self: center;
    width: 70%;
    flex: 1 1 30%;

    @include breakpoint.desktop {
      width: 40%;
      img {
        height: 220px;
      }
    }
  }
  ::v-deep .menu {
    flex: 1 1 40%;
  }
  figure {
    width: 100%;
    height: 25%;
    flex: 1 1 20%;

    margin-top: auto;
    text-align: end;
    display: flex;
    justify-content: flex-end;
  }
}

// 台灣地圖區
.map_area {
  color: black;
  font-size: 12px;
  height: 100vh;
  padding: 20px;
  margin-top: 50px;

  display: block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @include breakpoint.desktop {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    padding: 100px 20px 20px;
  }
  .Taiwan {
    width: 100%;
    height: calc(80vh - 70px);
    transform: translateX(-10px);
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
    @include breakpoint.desktop {
      flex: 1 1 40%;
      width: 40%;
    }
    .title {
      box-sizing: content-box;
      width: 50%;
      max-width: 230px;
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
      margin-bottom: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      @include breakpoint.desktop {
        margin-bottom: 50px;
      }

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
      .hoverDistrict {
        background: none;
        color: #3b6c85;
        transition: all 0.5s;
      }
    }
  }
}

// cities 縣市列表
.cities_group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  a {
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
  justify-content: flex-start;

  .dropDown_menu {
    width: 100%;
    max-width: 650px;
    height: 60px;
    padding: 20px 30px;
    border-radius: 24px;
    margin: 0 0 20px;
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
    max-width: 650px;
    top: 80px;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: fit-content;
    @include breakpoint.mobile {
      width: initial;
    }
  }
  .search_button {
    width: 100%;
    max-width: 650px;
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

// footer
footer {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  // justify-items: start;
  // align-items: start;
  background: #f2f2f2;
  font-size: 16px;
  p {
    text-align: start;
  }
  div {
    display: flex;
  }
  .about {
    color: #f79c31;
    font-weight: 900;
  }
  .copyright {
    text-align: center;
    margin-top: auto;
    font-weight: 700;
  }
}
</style>
