<template>
  <main>
    <aside>
      <div class="search_title">
        <h3>{{ cityName }}</h3>
      </div>
    </aside>
    <section>
      <div class="search_filters">
        <!-- <i class="fas fa-map-marker-alt fa-fw"></i> -->
        <router-link
          :to="{ path: `/search/${cityLink}/ScenicSpot`, name: ScenicSpot }"
          ><i class="fas fa-mountain fa-fw"></i
        ></router-link>
        <router-link :to="{ path: `/search/${cityLink}/Restaurant` }"
          ><i class="fas fa-utensils fa-fw"></i
        ></router-link>
        <router-link :to="{ path: `/search/${cityLink}/Hotel`, name: Hotel }">
          <i class="fas fa-bed fa-fw"></i
        ></router-link>
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
import getApi from "@/services/getApi.js";

export default {
  components: {},
  props: ["cityLink", "cityName"],
  data() {
    return {};
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
      getApi
        .getCity(this.$route.params.cityLink, this.displayQty, this.skip)
        .then((res) => {
          return (this.citySitesList = res.data);
        })
        .catch((err) => console.log(err));
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
main {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  @include breakpoint.desktop {
    height: 100vh;
    flex-direction: row;
    aside {
      flex: 1 1 40%;
      width: 40%;
    }
    section {
      flex: 1 1 60%;
      width: 60%;
      overflow: scroll;
      z-index: -1;
    }
  }
}

aside {
  padding: 10px;
  .search_title {
    padding: 25px;
    margin-bottom: 10px;
    h3 {
      font-size: 40px;
    }
  }
}
section {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background: #f7f7f7;
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
      &.router-link-exact-active {
        background: orange;
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
      column-gap: 30px;
    }
    @include breakpoint.tablet {
      grid-template-columns: repeat(3, 1fr);
      column-gap: 20px;
    }
    @include breakpoint.desktop {
      grid-template-columns: repeat(2, 1fr);
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
