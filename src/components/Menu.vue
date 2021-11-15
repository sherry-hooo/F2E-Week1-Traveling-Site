<template>
  <div class="menu">
    <div v-if="chosedCity" @click="openMenu = !openMenu" class="custom_select">
      {{ chosedCity }}
      <img
        :style="rotate"
        class="toggle_icon"
        src="@/assets/toggle.svg"
        alt="toggle icon"
      />
    </div>
    <div v-if="openMenu" class="cities_list">
      <label
        v-for="city of citiesList"
        :key="city.id"
        :class="{ filledColor: chosedCity === city.cityName }"
      >
        {{ city.cityName }}
        <input
          class="radio"
          type="radio"
          :id="city.cityLink"
          :value="city.cityName"
          @click="toggleMenu"
        />
      </label>
    </div>
    <button class="search_button" @click="goSearch(getChosedCityLink)">
      搜尋
    </button>
  </div>
</template>

<script>
import citiesList from '@/assets/data/citiesList.json'

export default {
  name: 'Menu',
  props: ['cityResult'],
  data() {
    // console.log(JSON.stringify(this.citiesList))
    return {
      chosedCity: this.cityResult ? this.cityResult : '請選擇縣市',
      cityLink: '',
      openMenu: false,
    }
  },
  computed: {
    citiesList() {
      return citiesList
    },
    rotate() {
      return {
        transform: this.openMenu ? `rotate(180deg)` : '',
      }
    },
    getChosedCityLink() {
      if (this.chosedCity === '請選擇縣市') {
        return
      }
      return this.citiesList.find((city) => city.cityName === this.chosedCity)
        .cityLink
    },
  },
  methods: {
    toggleMenu(event) {
      this.chosedCity = event.target.value
      this.openMenu = !this.openMenu
    },
    goSearch(city) {
      if (this.chosedCity === '請選擇縣市') {
        return
      }
      this.$router.push(`/search/${city}`)
      // location.reload()
    },
  },
}
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  position: relative;

  .custom_select {
    width: 80%;
    height: 60px;
    padding: 20px 30px;
    border-radius: 24px;
    background: #ffffff;
    font-size: 18px;

    display: flex;
    justify-content: space-between;
    .toggle_icon {
      width: 16px;
      pointer-events: none;
    }
  }
  .search_button {
    width: 80%;
    height: 60px;
    border-radius: 24px;
    outline: none;
    background: url(/img/放大鏡.e619c7da.svg) bottom 50% left 70% / 30px 40px
        no-repeat,
      #f79c31;
    font-size: 18px;
    text-align: center;

    &:hover {
      box-shadow: -2px 4px 4px #6d6c6c;
      transform: translate(1px, -1px);
      transition: all 0.3s;
    }
  }
}

.cities_list {
  width: 80%;
  border-radius: 24px;
  padding: 20px 10px;
  position: absolute;
  z-index: 999;
  top: 75px;
  background: white;
  border: 1px solid #aeaeae;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 10px;
  justify-items: center;
  @media (min-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 768px) {
    padding: 20px 40px;
    grid-template-columns: repeat(4, 1fr);
  }
  .radio {
    display: none;
  }
  label {
    flex: 1 1 auto;
    border-radius: 20px;
    width: fit-content;
    padding: 10px;
    &:hover {
      background: #93b6c8;
      border: #93b6c8;
    }
    @media (min-width: 576px) {
      font-size: 18px;
      padding: 15px 30px;
    }
    @media (min-width: 768px) {
      // border: 1px solid #aeaeae;
    }
  }
}

.filledColor {
  background-color: #93b6c8;
}
</style>
