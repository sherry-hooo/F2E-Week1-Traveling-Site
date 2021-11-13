<template>
  <section>
    <Menu :cityResult="cityLink" />
    <div class="search_result">
      <p>顯示搜尋結果{{ cityLink }}</p>
      <p>顯示搜尋結果{{ cityName }}</p>
    </div>
    <div class="cards_area">
      <CitySite
        v-for="citySite of citySitesList"
        :key="citySite.id"
        :citySite="citySite"
        :cityLink="cityLink"
      ></CitySite>
    </div>
  </section>
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
  props: ['cityName', 'cityLink'],
  data() {
    return {
      displayQty: 10,
      citySitesList: null,
    }
  },
  computed: {
    citiesList() {
      return citiesList
    },
  },
  methods: {},
  watch: {
    cityLink() {
      console.log(this.cityName)
      console.log('watch')
      getCitysiteInfo
        .getCity(this.cityLink)
        .then((res) => (this.citySitesList = res.data))
        .catch((err) => console.log(err))
    },
  },
  created() {
    console.log('created')
    getCitysiteInfo
      .getCity(this.cityLink)
      .then((res) => (this.citySitesList = res.data))
      .catch((err) => console.log(err))
  },
  updated() {
    console.log('updated') //check only
  },
  beforeUpdate() {
    console.log('beforeUpdate') //check only
  },
}
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  background: #f7f7f7;
  .menu {
    margin-bottom: 40px;
    flex-direction: row;
    .custom_select {
      width: 60%;
    }
  }
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
  .custom_select {
    width: 60%;
  }
  .search_button {
    width: 30%;
    background-position: 90%;
  }
}
</style>
