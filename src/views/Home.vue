<template>
  <main class="home">
    <div class="main_bg">
      <img
        class="slogan"
        src="@/assets/slogan.svg"
        alt="368個鄉鎮市區 總有一個你的菜,這次想去哪裡鴨？"
      />
      <Menu/>
      <figure>
        <img alt="black-duck" src="@/assets/black-duck.svg" />
        <img alt="white-duck" src="@/assets/white-duck.svg" />
      </figure>
    </div>

    <section>
      <h2>找個沒去過的</h2>
      <div class="thumbnail_group">
        <City v-for="city of displayList" :key="city.id" :city="city"></City>
      </div>
      <button class="more_button" v-if="!showAll" @click="showAll = true">
        看更多
      </button>
    </section>
  </main>
</template>

<script>
import citiesList from '@/assets/data/citiesList.json'
import City from '../components/City.vue'
import Menu from '../components/Menu.vue'

export default {
  name: 'Home',
  components: {
    City,
    Menu,
  },
  data() {
    return {
      showAll: false,
      chosedCity: '請選擇縣市',
    }
  },
  computed: {
    citiesList() {
      return citiesList;
      // return [
      //   {
      //     cityName: '臺北市',
      //     cityLink: 'Taipei',
      //     // image: require('@/assets/Taipei.png'),
      //   },
      //   {
      //     cityName: '新北市',
      //     cityLink: 'NewTaipei',
      //     // image: require('@/assets/NewTaipei.png'),
      //   },
      //   {
      //     cityName: '桃園市',
      //     cityLink: 'Taoyuan',
      //     // image: require('@/assets/Taoyuan.png'),
      //   },
      //   {
      //     cityName: '臺中市',
      //     cityLink: 'Taichung',
      //     // image: require('@/assets/Taichung.png'),
      //   },
      //   {
      //     cityName: '臺南市',
      //     cityLink: 'Tainan',
      //     // image: require('@/assets/Tainan.png'),
      //   },
      //   {
      //     cityName: '高雄市',
      //     cityLink: 'Kaohsiung',
      //     // image: require('@/assets/Kaohsiung.png'),
      //   },
      //   {
      //     cityName: '基隆市',
      //     cityLink: 'Keelung',
      //     // image: require('@/assets/Keelung.png'),
      //   },
      //   {
      //     cityName: '新竹市',
      //     cityLink: 'Hsinchu',
      //     // image: require('@/assets/Hsinchu.png'),
      //   },
      //   {
      //     cityName: '新竹縣',
      //     cityLink: 'HsinchuCounty',
      //     // image: require('@/assets/HsinchuCounty.png'),
      //   },
      //   {
      //     cityName: '苗栗縣',
      //     cityLink: 'MiaoliCounty',
      //     // image: require('@/assets/MiaoliCounty.png'),
      //   },
      //   {
      //     cityName: '彰化縣',
      //     cityLink: 'ChanghuaCounty',
      //     // image: require('@/assets/ChanghuaCounty.png'),
      //   },
      //   {
      //     cityName: '南投縣',
      //     cityLink: 'NantouCounty',
      //     // image: require('@/assets/NantouCounty.png'),
      //   },
      //   {
      //     cityName: '雲林縣',
      //     cityLink: 'YunlinCounty',
      //     // image: require('@/assets/YunlinCounty.png'),
      //   },
      //   {
      //     cityName: '嘉義縣',
      //     cityLink: 'ChiayiCounty',
      //     // image: require('@/assets/ChiayiCounty.png'),
      //   },
      //   {
      //     cityName: '嘉義市',
      //     cityLink: 'Chiayi',
      //     // image: require('@/assets/Chiayi.png'),
      //   },
      //   {
      //     cityName: '屏東縣',
      //     cityLink: 'PingtungCounty',
      //     // image: require('@/assets/PingtungCounty.png'),
      //   },
      //   {
      //     cityName: '宜蘭縣',
      //     cityLink: 'YilanCounty',
      //     // image: require('@/assets/YilanCounty.png'),
      //   },
      //   {
      //     cityName: '花蓮縣',
      //     cityLink: 'HualienCounty',
      //     // image: require('@/assets/HualienCounty.png'),
      //   },
      //   {
      //     cityName: '臺東縣',
      //     cityLink: 'TaitungCounty',
      //     // image: require('@/assets/TaitungCounty.png'),
      //   },
      //   {
      //     cityName: '金門縣',
      //     cityLink: 'KinmenCounty',
      //     // image: require('@/assets/KinmenCounty.png'),
      //   },
      //   {
      //     cityName: '澎湖縣',
      //     cityLink: 'PenghuCounty',
      //     // image: require('@/assets/PenghuCounty.png'),
      //   },
      //   {
      //     cityName: '連江縣',
      //     cityLink: 'LienchiangCounty',
      //     // image: require('@/assets/LienchiangCounty.png'),
      //   },
      // ]
    },
    displayList() {
      return this.showAll
        ? this.citiesList
        : this.citiesList.filter((city, index) => index < 4)
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  margin-bottom: 50px;
}
section {
  padding: 0 20px;
  h2 {
    margin-left: 20px;
    text-align: start;
  }
  .thumbnail_group {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;
    a {
      margin: 20px;
    }
  }
  .more_button {
    color: #aeaeae;
    font-weight: 400;
    font-size: 24px;
    background: white;
    cursor: pointer;

    width: 80%;
    height: 52px;
    border: 1px solid #aeaeae;
    border-radius: 24px;

    &:hover {
      background: #aeaeae;
      color: white;
      transition: all 0.5s;
    }
  }
}

.main_bg {
  box-sizing: border-box;
  width: 100%;
  height: 500px;
  padding: 40px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  text-align: start;

  background: url('../assets/Main-Banner-Mask.png');
  background-repeat: no-repeat;
  background-size: cover;

  .slogan {
    align-self: start;
    width: 40%;
  }

  figure {
    align-self: end;
    transform: translateY(30%);
  }
}
</style>
