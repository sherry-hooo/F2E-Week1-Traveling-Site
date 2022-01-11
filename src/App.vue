<template>
  <header id="nav">
    <router-link to="/" v-if="displayLogo">
      <h1 id="logo">
        <img src="./assets/img/logo.svg" alt="要去哪裡鴨logo" />
      </h1>
    </router-link>
    <Menu v-if="$route.path != '/'" @openMenu="openMenu"></Menu>
  </header>
  <router-view />
</template>

<script>
import Menu from "@/components/Menu.vue";

export default {
  components: {
    Menu,
  },
  data() {
    return {
      displayLogo: true,
    };
  },
  methods: {
    openMenu(menuIsOpen) {
      this.displayLogo = !menuIsOpen;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

:root {
  font-size: 16px;
  @include breakpoint.desktop {
    font-size: 20px;
  }
}

#nav {
  background: white;
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  padding: 5px;
  // border-bottom: 1px solid black;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  a {
    float: left;
    h1 {
      width: 150px;
      font-size: 0;
      img {
        width: 100%;
        vertical-align: bottom;
      }
    }
  }

  @include breakpoint.mobile {
    height: 70px;
    padding: 5px 15px;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
}

header + main {
  // margin-top: 100px;
  @include breakpoint.mobile {
    // margin-top: 70px;
  }
}
</style>
