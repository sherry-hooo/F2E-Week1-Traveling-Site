<template>
  <main>
    <section>
      <Menu :cityResult="cityName" />
      <div class="search_result">
        <h3>顯示搜尋結果： {{ cityName }}</h3>
      </div>
      <div v-if="citySitesList" class="cards_area">
        <CitySite
          v-for="citySite of citySitesList"
          :key="citySite.id"
          :citySite="citySite"
          :cityLink="$route.params.cityLink"
        ></CitySite>
      </div>
    </section>

    <button v-if="!lastPage" @click="changePage" class="more_button">
      看更多
    </button>
  </main>
</template>

<script>
import citiesList from '@/assets/data/citiesList.json'
import CitySite from '@/components/CitySite.vue'
import getCitysiteInfo from '@/services/getCitysiteInfo.js'
import Menu from '@/components/Menu.vue'

export default {
  components: {
    CitySite,
    Menu,
  },
  props: ['cityLink', 'cityName', 'page'],
  data() {
    return {
      displayQty: 30,
      skip: 0,
      citySitesList: null,
    }
  },
  computed: {
    citiesList() {
      return citiesList
    },
    lastPage() {
      return this.citySitesList.length < 30
    },
  },
  methods: {
    changePage() {
      this.skip += 30
      getCitysiteInfo
        .getCity(this.$route.params.cityLink, this.displayQty, this.skip)
        .then((res) => {
          return (this.citySitesList = res.data)
        })
        .catch((err) => console.log(err))
    },
  },
  watch: {
    cityName() {
      console.log('watch')
      getCitysiteInfo
        .getCity(this.$route.params.cityLink, this.displayQty, this.skip)
        .then((res) => (this.citySitesList = res.data))
        .catch((err) => console.log(err))
    },
  },
  created() {
    getCitysiteInfo
      .getCity(this.$route.params.cityLink, this.displayQty, this.skip)
      .then((res) => (this.citySitesList = res.data))
      .catch((err) => console.log(err))
  },
}
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

  .search_result {
    margin-bottom: 40px;
  }
  .cards_area {
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
</style>
