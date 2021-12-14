<template>
  <main class="home">
    <div class="main_bg"></div>
    <section class="banner">
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
    <section class="district_intro">
      <p class="subtitle"><img src="@/assets/img/找個沒去過的.svg" /></p>
      <div class="district_group">
        <div class="district_buttons">
          <button
            v-for="district of districts"
            :key="district.id"
            class="district"
            :data-name="district"
            @click="toggleDistrict"
          >
            {{ district }}
          </button>
        </div>

        <ul class="cities_group">
          <City
            v-for="city of displayedCities"
            :key="city.id"
            :city="city"
            data-city="city.id"
            :class="{ hoverCity: city.id === hoveredArea }"
            @mouseover="hoveredCity = city.id"
          ></City>
        </ul>
        <div class="recent_events"></div>
      </div>

      <div class="Taiwan">
        <TaiwanMap :hoveredCity="hoveredCity" />
      </div>
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
    City,
    Menu,
    TaiwanMap,
  },
  data() {
    return {
      showAll: false,
      chosedCity: "請選擇縣市",
      hoveredArea: "",
      hoveredCity: "",
      displayedCities: [],
      districts: ["北部", "中部", "南部", "東部", "離島"],
    };
  },
  computed: {
    citiesList() {
      return citiesList;
    },
    displayList() {
      return this.showAll
        ? this.citiesList
        : this.citiesList.filter((city, index) => index < 4);
    },
  },
  methods: {
    toggleDistrict(event) {
      this.displayedCities = this.citiesList.filter(
        (city) => city.district === event.target.dataset.name
      );
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  overflow: hidden;
  .main_bg {
    position: fixed;
    z-index: -1;
    top: 70px;
  }
  .district_intro {
    margin-top: 20vh;
    position: relative;
    z-index: -1;
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
.banner {
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 70px);
  padding: 40px 0 40px 30px;
  margin-bottom: 100px;
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

.subtitle {
  margin: 0 auto 20px;
  width: 50%;
  @media (min-width: 576px) {
    width: 200px;
  }
  @media (min-width: 768px) {
    margin-left: 40px;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.district_intro {
  display: flex;
  flex-direction: column;
  color: black;
  font-size: 12px;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;
  }

  .Taiwan {
    // width: 40%;
    flex: 0 0 40%;
    // height: 500px;
    > * {
      width: 100%;
      height: 100%;
    }
  }
  .district_group {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    flex: 1 1 45%;

    .district_buttons {
      flex: 0 1 100%;
      display: flex;
      gap: 10px;
      justify-content: center;

      .district {
        flex: 0 1 100px;
        min-height: 60px;
        min-width: 60px;
        border: 3px solid #3b6c85;
        border-radius: 50px;
        background: #3b6c85;
        color: white;
        font-weight: 700;
        font-size: 14px;
        transition: all 0.5s;

        @media (min-width: 576px) {
          font-size: 16px;
        }
        @media (min-width: 768px) {
          font-size: 20px;
        }

        &:hover {
          background: none;
          color: #3b6c85;
          transition: all 0.5s;
        }
      }
    }
    .cities_group {
      flex: 0 1 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
    }
  }
}

.district_intro {
  padding: 20px;
  p {
    margin-left: 20px;
    text-align: start;
  }
  .thumbnail_group {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;
    a {
      margin: 20px;
    }
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

  .dropDown_menu {
    height: 60px;
    padding: 20px 30px;
    border-radius: 24px;
    background: #ffffff;
    font-size: 18px;
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
    width: 100%;
    top: 110%;
  }
  .search_button {
    font-size: 18px;
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
