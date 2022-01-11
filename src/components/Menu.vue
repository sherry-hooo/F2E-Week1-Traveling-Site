<template>
  <div class="menu">
    <div class="dropDown_menu" @click="toggleMenu">
      {{ chosedCity }}
      <img
        :style="rotate"
        class="toggle_icon"
        src="@/assets/img/toggle.svg"
        alt="toggle icon"
      />
    </div>
    <div v-if="openMenu" class="dropDown_select dropDown_animation">
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
          @click="chooseCity"
        />
      </label>
    </div>
    <button class="search_button" @click="goSearch(getChosedCityLink)">
      搜尋
    </button>
  </div>
</template>

<script>
import citiesList from "@/assets/data/citiesList.json";

export default {
  name: "Menu",
  props: [],
  data() {
    return {
      chosedCity: "請選擇縣市",
      cityLink: "",
      openMenu: false,
    };
  },
  computed: {
    citiesList() {
      return citiesList;
    },
    rotate() {
      return {
        transform: this.openMenu ? `rotate(180deg)` : "",
      };
    },
    getChosedCityLink() {
      if (this.chosedCity === "請選擇縣市") {
        return;
      }
      return this.citiesList.find((city) => city.cityName === this.chosedCity)
        .cityLink;
    },
  },
  methods: {
    toggleMenu() {
      this.openMenu = !this.openMenu;
      this.$emit("openMenu", this.openMenu);
    },
    chooseCity(event) {
      this.chosedCity = event.target.value;
      this.toggleMenu();
    },
    goSearch(cityLink) {
      if (this.chosedCityLink === "請選擇縣市") {
        return;
      }
      this.$router.push({ name: "Search", params: { cityLink: cityLink } });
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  // padding: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @include breakpoint.mobile {
    justify-content: flex-end;
  }
  .dropDown_menu {
    font-size: 16px;
    background: #ffffff;
    box-sizing: border-box;
    width: 150px;
    padding: 5px;
    border-radius: 24px;
    border: 1px solid black;
    cursor: pointer;
    margin-right: 10px;

    display: flex;
    justify-content: space-around;
    align-items: center;
    .toggle_icon {
      width: 12px;
      pointer-events: none;
    }
    &:hover {
      .toggle_icon {
        animation: pointingDown 0.4s infinite alternate;
      }
    }
    @include breakpoint.mobile {
      font-size: 20px;
      height: 100%;
      width: 200px;
      margin-bottom: 0;
    }
  }
  .search_button {
    font-size: 16px;
    box-sizing: border-box;
    width: 150px;
    border-radius: 24px;
    padding: 5px;
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
    @include breakpoint.mobile {
      font-size: 20px;
      height: 100%;
    }
  }
}

@keyframes pointingDown {
  from {
    transform: translateY(1px);
  }
  to {
    transform: translateY(3px);
  }
}

// 下拉式選單
.dropDown_select {
  background: white;
  width: calc(100% + 10px);
  border-bottom: 1px solid black;
  padding: 20px 10px;
  position: absolute;
  z-index: 10;
  top: 100%;
  left: -5px;
  transition: all 0.4s ease-in-out;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 10px;
  column-gap: 2px;
  justify-items: center;
  @include breakpoint.mobile {
    grid-template-columns: repeat(3, 1fr);
    width: calc(100% + 30px);
    left: -15px;
  }
  @include breakpoint.tablet {
    padding: 20px;
    grid-template-columns: repeat(4, 1fr);
  }
  .radio {
    display: none;
  }
  label {
    flex: 1 1 auto;
    border-radius: 20px;
    width: 100%;
    padding: 10px 0;
    text-align: center;
    &:hover {
      background: #93b6c8;
      border: #93b6c8;
    }
    @media (min-width: 576px) {
      font-size: 18px;
    }
  }
}

// hover dropDown select 時填色
.filledColor {
  background-color: #93b6c8;
}

// dropDown Animation
.dropDown_animation {
  animation: growDown 500ms ease-in-out forwards;
  transform-origin: top;
}

@keyframes growDown {
  0% {
    transform: scaleY(0);
  }
  80% {
    transform: scaleY(1.1);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>
