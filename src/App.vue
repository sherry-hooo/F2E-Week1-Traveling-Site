<template>
  <header id="nav">
    <router-link to="/">
      <h1 id="logo">
        <img src="./assets/logo.svg" alt="要去哪裡鴨logo" />
      </h1>
    </router-link>
    <!-- <router-link to="/search">Search</router-link> -->
    <router-link to="/about">Search</router-link>
  </header>
  <router-view />

  <footer>
    <p class="about">關於我們</p>
    <p>立志成為幫忙發現台灣之美的眼睛 幫您找出下一個旅遊景點</p>
    <p>Copyright &copy; 2021 要去哪裡鴨. All rights reserved.</p>
  </footer>
</template>

<style lang="scss">
@use '@/assets/scss/_reset.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  box-sizing: border-box;
  height: 70px;
  padding: 10px 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;

  h1 {
    flex-grow: 1;
    // flex: 1 1 50%;
    margin: 0;
    text-align: start;
    img {
      width: 150px;
    }
  }

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

footer {
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  justify-items: start;
  align-items: flex-start;
  padding: 20px 30px;

  p + p {
    margin-top: 20px;
  }
  .about {
    color: #f79c31;
    font-weight: 900;
  }
}
</style>
