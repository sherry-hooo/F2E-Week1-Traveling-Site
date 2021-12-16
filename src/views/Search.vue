<template>
  <main>
    <aside>
      <div class="search_title">
        <h3>{{ cityName }}</h3>
      </div>

      <div class="cityMap">
        <Map></Map>
      </div>
    </aside>
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
    };
  },
  computed: {
    citiesList() {
      return citiesList;
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
  display: flex;
  flex-direction: column;
  @include breakpoint.desktop {
    height: calc(100vh - 70px);
    flex-direction: row;
    flex-wrap: wrap;
    aside {
      flex: 1 1 50%;
      width: 50%;
      height: 100%;
      overflow: scroll;
    }
    .search {
      flex: 1 1 50%;
      width: 50%;
      height: 100%;
      overflow: scroll;
    }
    .citySlider {
    }
  }
}

aside {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .search_title {
    padding: 25px;
    margin-bottom: 10px;
    h3,
    h4 {
      font-size: 40px;
    }
  }

  .cityMap {
    width: 100%;
    height: 70%;
    margin-top: auto;
  }
}
.search {
  box-sizing: border-box;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  .search_filters {
    padding: 20px 0;
    margin-bottom: 10px;
    display: flex;
    gap: 20px;
    justify-content: center;
    a {
      border: 3px solid black;
      border-radius: 50%;
      padding: 20px;
      color: black;
      cursor: pointer;
      transition: all 0.3s linear;
      &.router-link-exact-active {
        background: orange;
        transition: all 0.3s linear;
      }
      i {
        font-size: 30px;
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
</style>
