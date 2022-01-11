<template>
  <main>
    <!-- 簡介 + leaflet 地圖 -->
    <aside class="flip_card">
      <div class="map_icon" @click="mapSide = !mapSide">
        <i class="fas fa-map fa-fw" v-if="!mapSide"></i>
        <i class="fas fa-info fa-fw" v-else></i>
      </div>
      <div class="flip_card_inner" :class="{ flipMapSide: mapSide === true }">
        <div class="cityDes flip_card_frontSide">
          <h3 class="cityDes_title">
            {{ cityName }}
          </h3>
          <p class="cityDes_intro">{{ citiesIntro }}</p>
        </div>
        <div class="cityMap flip_card_backSide">
          <Map :city="cityLink"></Map>
        </div>
      </div>
    </aside>
    <!-- api 區 -->
    <section class="search" :class="{ scrollMode: mapSide }">
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
      <router-view />
    </section>
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
      mapSide: false,
    };
  },
  computed: {
    citiesList() {
      return citiesList;
    },
    citiesIntro() {
      return citiesList.find((city) => city.cityLink === this.cityLink).intro;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
main {
  min-height: calc(100vh - 100px);
  aside {
    height: 200px;
  }
  .search {
    height: 60%;
    min-height: calc(100vh - 70px - 200px);
    overflow: scroll;
  }
  @include breakpoint.mobile {
    min-height: calc(100vh - 70px);
  }
  @include breakpoint.desktop {
    display: flex;
    height: calc(100vh - 70px);
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
    padding: 10px 0;
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
      transition: background-color 0.2s ease-in;
      &:hover {
        transform: translate(2px, -4px);
      }
      &.router-link-exact-active {
        background-color: orange;
        transition: all 0.3s linear;
      }
      i {
        font-size: 24px;
      }
    }
  }
  ::v-deep .search_content {
    min-height: 50%;
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    > a {
      width: calc(100% - 20px);
      margin: 10px;
      @include breakpoint.mobile {
        aspect-ratio: 1;
        width: calc(50% - 30px);
        margin: 15px;
      }
      @include breakpoint.tablet {
        width: calc(33.3% - 20px);
        margin: 10px;
      }
      @include breakpoint.desktop {
        width: calc(50% - 20px);
        height: calc(50% - 20px);
      }
      @include breakpoint.bgScreen {
        width: calc(33.3% - 20px);
      }
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
  .flipMapSide {
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
    // position: absolute;
    // top: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: all 0.6s;
  }
  &_backSide {
    position: absolute;
    top: 0;
    width: 100%;
    height: calc((100vh - 100px) * 0.6);
    backface-visibility: hidden;
    transform: rotateY(180deg);
    transition: all 0.6s;
    @include breakpoint.mobile {
      height: calc((100vh - 70px) * 0.6);
    }
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

aside + .scrollMode {
  height: calc((100vh - 100px) * 0.4);
  min-height: initial;
  margin-top: calc((100vh - 100px) * 0.6 - 200px);
  .search_filters {
    width: 100%;
    margin: 0;
    a {
      margin: 0 10px;
      width: 40px;
      height: 40px;
      line-height: 40px;
      i {
        font-size: 18px;
      }
    }
  }
  ::v-deep .search_content {
    flex-wrap: nowrap;
    overflow: scroll;
    > a {
      margin: 0 10px;
      min-width: 150px;
      .myCard {
        padding: 0;
        border: none;
      }
    }
  }
  @include breakpoint.mobile {
    height: calc((100vh - 70px) * 0.4);
    margin-top: calc((100vh - 70px) * 0.6 - 200px);
  }
}

%thumbnail_text {
  position: absolute;
  top: 0;
  width: 100%;
  height: 40%;
  background: #ffffffa1;
  backdrop-filter: blur(3px);
  /* text-align: center; */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
