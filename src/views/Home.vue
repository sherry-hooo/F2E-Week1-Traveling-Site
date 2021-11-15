<template>
  <main class="home">
    <div class="banner">
      <img
        class="slogan"
        src="@/assets/slogan.svg"
        alt="368個鄉鎮市區 總有一個你的菜,這次想去哪裡鴨？"
      />
      <Menu />
      <figure>
        <img id="duck" alt="black-duck" src="@/assets/black-duck.svg" />
        <img alt="white-duck" src="@/assets/white-duck.svg" />
      </figure>
    </div>

    <p class="subtitle"><img src="@/assets/找個沒去過的.svg" /></p>
    <section class="district_intro">
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
import citiesList from '@/assets/data/citiesList.json'
import City from '../components/City.vue'
import TaiwanMap from '../components/TaiwanMap.vue'
import Menu from '../components/Menu.vue'

export default {
  name: 'Home',
  components: {
    City,
    Menu,
    TaiwanMap,
  },
  data() {
    return {
      showAll: false,
      chosedCity: '請選擇縣市',
      hoveredArea: '',
      hoveredCity: '',
      displayedCities: [],
      districts: ['北部', '中部', '南部', '東部', '離島'],
    }
  },
  computed: {
    citiesList() {
      return citiesList
    },
    displayList() {
      return this.showAll
        ? this.citiesList
        : this.citiesList.filter((city, index) => index < 4)
    },
  },
  methods: {
    toggleDistrict(event) {
      this.displayedCities = this.citiesList.filter(
        (city) => city.district === event.target.dataset.name,
      )
    },
  },
}
</script>

<style lang="scss" scoped>
#duck {
  // width: 150px;
  animation: walking 1s linear infinite alternate;
  // position: absolute;
}

@keyframes walking {
  0% {
    transform: rotate(3deg);
  }
  100% {
    transform: rotate(-3deg);
  }
}
// banner
.banner {
  box-sizing: border-box;
  width: 100%;
  height: 500px;
  padding: 40px 0 40px 30px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  text-align: start;

  background: url('../assets/Main-Banner-Mask.png');
  background-repeat: no-repeat;
  background-size: cover;

  .slogan {
    align-self: center;
    width: 80%;
    @media (min-width: 768px) {
      align-self: flex-start;
      width: 50%;
    }
  }

  figure {
    align-self: end;
    transform: translateY(20%);
    @media (min-width: 576px) {
      transform: translateY(15%);
    }
  }
}

.subtitle {
  margin: 0 auto 20px;
  width: 70%;
  @media (min-width: 576px) {
    width: 30%;
  }
  @media (min-width: 768px) {
    width: 25%;
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
main {
  margin-bottom: 50px;
}
section {
  padding: 0 20px;
  margin-bottom: 40px;
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
</style>
