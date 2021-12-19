<template>
  <main>
    <!-- 簡介 + leaflet 地圖 -->
    <aside class="flip_card">
      <div class="map_icon" @click="flipAnotherSide = !flipAnotherSide">
        <i class="fas fa-map fa-fw" v-if="!flipAnotherSide"></i>
        <i class="fas fa-info fa-fw" v-else></i>
      </div>
      <div
        class="flip_card_inner"
        :class="{ flipAnotherSide: flipAnotherSide === true }"
      >
        <div class="cityDes flip_card_frontSide">
          <h3 class="cityDes_title">
            {{ cityName }}
          </h3>
          <p class="cityDes_intro">{{ citiesIntro }}</p>
        </div>
        <div class="cityMap flip_card_backSide">
          <Map></Map>
        </div>
      </div>
    </aside>
    <!-- api 區 -->
    <section class="search">
      <div class="search_filters">
        <router-link :to="{ name: 'ScenicSpot', params: { cityLink } }"
          ><i class="fas fa-mountain fa-fw"></i>
        </router-link>
        <router-link :to="{ name: 'Restaurant', params: { cityLink } }"
          ><i class="fas fa-utensils fa-fw"></i>
        </router-link>
        <router-link
          :to="{
            name: 'Hotel',
            params: { cityLink },
          }"
        >
          <i class="fas fa-bed fa-fw"></i>
        </router-link>
        <router-link
          :to="{
            name: 'Activity',
            params: { cityLink },
          }"
        >
          <i class="fas fa-calendar-alt fa-fw"></i>
        </router-link>
      </div>
      <div class="search_content">
        <router-view />
      </div>
    </section>
    <button v-if="!lastPage" @click="changePage" class="more_button">
      看更多
    </button>
  </main>
</template>

<script>
import citiesList from "@/assets/data/citiesList.json";
import Map from "@/components/Map.vue";

export default {
  components: { Map },
  props: ["cityLink", "cityName"],
  data() {
    return {
      activityList: [],
      flipAnotherSide: false,
    };
  },
  computed: {
    citiesList() {
      return citiesList;
    },
    citiesIntro() {
      return citiesList.find((city) => city.cityLink === this.cityLink).intro;
    },
    lastPage() {
      // return this.citySitesList.length < 30;
      // 待改
      return true;
    },
  },
  methods: {
    changePage() {
      this.skip += 30;
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
main {
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  aside {
    height: 40%;
  }
  .search {
    height: 60%;
    overflow: scroll;
  }
  @include breakpoint.mobile {
    height: calc(100vh - 70px);
  }
  @include breakpoint.desktop {
    flex-direction: row;
    flex-wrap: wrap;
    aside {
      flex: 1 1 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
    }
    .search {
      flex: 1 1 50%;
      width: 50%;
      height: 100%;
      overflow: scroll;
    }
  }
}

aside {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;
  .map_icon {
    width: fit-content;
    border: 3px solid black;
    border-radius: 50%;
    padding: 5px;
    font-size: 16px;
    background: white;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 5;
    cursor: pointer;
    @include breakpoint.tablet {
      padding: 10px;
      top: 15px;
      right: 15px;
      font-size: 20px;
    }
    @include breakpoint.desktop {
      display: none;
    }
  }
  .cityDes {
    height: 100%;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    @include breakpoint.mobile {
      padding: 15px;
    }
    @include breakpoint.desktop {
      padding: 25px;
      width: 100%;
      height: 30%;
    }
    &_title {
      @extend %main-title;
    }
    &_intro {
      @extend %content;
    }
  }

  .cityMap {
    @include breakpoint.desktop {
      display: block;
      width: 100%;
      height: 70%;
    }
  }
}
.search {
  box-sizing: border-box;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  .search_filters {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    a {
      width: 48px;
      height: 48px;
      line-height: 48px;
      border: 3px solid black;
      border-radius: 50%;
      margin: 10px;
      color: black;
      cursor: pointer;
      transition: all 0.3s linear;
      &.router-link-exact-active {
        background: orange;
        transition: all 0.3s linear;
      }
      i {
        font-size: 24px;
      }
    }

    @include breakpoint.tablet {
      a {
        width: 70px;
        height: 70px;
        line-height: 70px;
        i {
          font-size: 30px;
        }
      }
    }
  }
  .search_content {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;

    @include breakpoint.mobile {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 30px;
    }
    @include breakpoint.tablet {
      grid-template-columns: repeat(3, 1fr);
    }
    @include breakpoint.desktop {
      grid-template-columns: repeat(2, 1fr);
    }
    @include breakpoint.bgScreen {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.more_button {
  color: #aeaeae;
  font-weight: 400;
  font-size: 24px;
  background: white;
  cursor: pointer;

  width: 50%;
  height: 52px;
  border: 1px solid #aeaeae;
  border-radius: 24px;
  margin-top: 20px;

  &:hover {
    background: #aeaeae;
    color: white;
    transition: all 0.5s;
  }
}

.flip_card {
  perspective: 1000px;
  .flipAnotherSide {
    transform: rotateY(180deg);
    transition: all 0.6s;
  }
  &_inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: all 0.6s;
  }
  &_frontSide {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: all 0.6s;
  }
  &_backSide {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transform: rotateY(180deg);
    transition: all 0.6s;
  }
  @include breakpoint.desktop {
    perspective: 0;
    &_inner,
    &_frontSide,
    &_backSide {
      position: unset;
      transform: unset;
      transition: unset;
    }
  }
}
</style>
