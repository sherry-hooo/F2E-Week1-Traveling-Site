<template>
  <main>
    <section>
      <Menu :cityResult="cityName" />
      <div class="search_title">
        <h3>{{ cityName }}</h3>
      </div>
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
import Menu from "@/components/Menu.vue";

export default {
  components: {
    Menu,
  },
  props: ["cityLink", "cityName"],
  data() {
    return {
      displayQty: 30,
      skip: 0,
      citySitesList: null,
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
      getApi
        .getCity(this.$route.params.cityLink, this.displayQty, this.skip)
        .then((res) => {
          return (this.citySitesList = res.data);
        })
        .catch((err) => console.log(err));
    },
  },
  watch: {
    cityName() {
      console.log("watch");
      getApi
        .getCity(this.$route.params.cityLink, this.displayQty, this.skip)
        .then((res) => (this.citySitesList = res.data))
        .catch((err) => console.log(err));
    },
  },
  created() {
    getApi
      .getCity(this.$route.params.cityLink, this.displayQty, this.skip)
      .then((res) => (this.citySitesList = res.data))
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped>
main {
  margin-bottom: 20px;
}
section {
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  background: #f7f7f7;

  .search_title {
    padding: 25px;
    margin-bottom: 10px;
    h3 {
      font-size: 40px;
    }
  }
  .search_content {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;

    @media (min-width: 576px) {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 30px;
    }
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

::v-deep .menu {
  justify-content: space-between;
  flex-direction: row;
  margin: 0 0 40px 0;
  .custom_select {
    flex: 1 1 70%;
  }
  .search_button {
    flex: 1 1 30%;
    background: url(/img/放大鏡.e619c7da.svg) top 30% left 90% / 15px 15px
        no-repeat,
      #f79c31;
    @media (min-width: 576px) {
      background: url(/img/放大鏡.e619c7da.svg) bottom 50% left 80% / 30px 40px
          no-repeat,
        #f79c31;
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
</style>
