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

  <footer>
    <p class="about">關於我們</p>
    <p>立志成為幫忙發現台灣之美的眼睛 幫您找出下一個旅遊景點</p>
    <div>
      <p>UI Design：Rex Lai</p>
      <p>Web Design：Hooo.</p>
    </div>
    <p>Copyright &copy; 2021 要去哪裡鴨. All rights reserved.</p>
  </footer>
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
  padding-top: 100px;
  @include breakpoint.mobile {
    padding-top: 70px;
  }
}

* {
  font-size: 16px;
  @media (min-width: 992px) {
    font-size: 20px;
  }
}

#nav {
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  background: white;
  border-bottom: 1px solid black;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 999;

  a {
    margin: 0 50px;
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
    flex-wrap: nowrap;
    justify-content: space-between;
  }
}

footer {
  display: flex;
  flex-direction: column;
  justify-items: start;
  align-items: start;
  background: #f2f2f2;
  padding: 20px 30px;
  gap: 10px;
  position: relative;
  z-index: -1;
  p {
    text-align: start;
  }
  .about {
    color: #f79c31;
    font-weight: 900;
  }
}
</style>
