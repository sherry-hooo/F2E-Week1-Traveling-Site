<template>
  <main>
    <div class="site_info">
      <figure class="site_info_img">
        <button class="changePage_button" @click="this.$router.go(-1)">
          <img src="@/assets/arrow.svg" alt="" />
        </button>
        <img
          v-if="siteInfo.Picture && siteInfo.Picture.PictureUrl1"
          :src="siteInfo.Picture.PictureUrl1"
          :alt="siteInfo.Picture.PictureUrl1PictureDescription1"
        />
        <img v-else src="@/assets/citiesImg/replacedImg2.jpg" alt="替代照片" />
      </figure>

      <ul class="site_info_des">
        <h4 class="title">{{ siteInfo.Name }}</h4>
        <li class="address">
          <img src="@/assets/location.svg" alt="地址圖示" />
          <span v-if="siteInfo.Address">{{ siteInfo.Address }}</span>
          <span v-else>待更新</span>
        </li>
        <li class="tel">
          <img src="@/assets/phone.svg" alt="電話圖示" />
          <a v-if="siteInfo.Phone" href="tel:">{{ siteInfo.Phone }}</a>
          <a v-else href="tel:">待更新</a>
        </li>
        <li class="time">
          <img src="@/assets/time.svg" alt="時間圖示" />
          <span v-if="siteInfo.OpenTime">{{ siteInfo.OpenTime }}</span>
          <span v-else>待更新</span>
        </li>
        <li class="price">
          <img src="@/assets/money.svg" alt="收費圖示" />
          <span v-if="siteInfo.TicketInfo">{{ siteInfo.TicketInfo }}</span>
          <span v-else>不收費</span>
        </li>
        <li class="remark">
          <img src="@/assets/edit.svg" alt="編輯圖示" />
          <span v-if="siteInfo.Remark">
            {{ siteInfo.Remark }}
          </span>
          <span v-else>待更新</span>
        </li>
      </ul>
      <article class="site_info_detail">
        {{ siteInfo.DescriptionDetail }}
      </article>

      <iframe
        :src="googleMap"
        frameborder="0"
        width="100%"
        height="300px"
        allowfullscreen
      ></iframe>
    </div>

    <section>
      <div v-if="nearByRestaurants" class="nearBy_area">
        <p v-if="nearByRestaurants" class="title">附近餐廳</p>
        <div class="thumbnail_area">
          <Thumbnail
            v-for="restaurant of nearByRestaurants"
            :key="restaurant.id"
            :restaurant="restaurant"
            :nearByRestaurants="nearByRestaurants"
          ></Thumbnail>
        </div>
      </div>

      <div v-if="nearByHotels" class="nearBy_area">
        <p v-if="nearByHotels" class="title">附近住宿</p>
        <div class="thumbnail_area">
          <Thumbnail
            v-for="restaurant of nearByHotels"
            :key="restaurant.id"
            :restaurant="restaurant"
            :nearByRestaurants="nearByHotels"
          ></Thumbnail>
        </div>
      </div>
      <p v-if="nearBySites" class="title">附近景點</p>
      <div class="thumbnail_area">
        <Thumbnail
          v-for="restaurant of nearBySites"
          :key="restaurant.id"
          :restaurant="restaurant"
          :nearByRestaurants="nearBySitess"
        ></Thumbnail>
      </div>

      <img id="duck" src="@/assets/哪裡鴨.svg" alt="" />
    </section>
  </main>
</template>

<script>
import Thumbnail from '@/components/Thumbnail.vue'
import getCitysiteInfo from '@/services/getCitysiteInfo.js'

export default {
  components: {
    Thumbnail,
  },
  props: ['name', 'id', 'city', 'cityLink'],
  data() {
    return {
      siteInfo: {},
      distance: 5000,
      nearByRestaurants: [],
      nearByHotels: [],
      nearBySites: null,
      googleMap: '',
    }
  },

  methods: {
    getSite() {
      console.log('getSite')
      return getCitysiteInfo.getSite(this.cityLink, this.id).then((res) => {
        this.siteInfo = res.data[0]
        return res.data[0].Position
      })
    },
    async getHotel(city, id) {
      console.log('getHotel')
      let hotel = await getCitysiteInfo.getHotel(city, id)
      console.log(hotel.data[0])
      this.siteInfo = hotel.data[0]
    },
    async getRestaurant(city, id) {
      console.log('get restaurant')
      let restaurant = await getCitysiteInfo.getRestaurant(city, id)
      console.log(restaurant.data[0])
      this.siteInfo = restaurant.data[0]
    },
    getNearRestaurant(lat, lon, distance) {
      return getCitysiteInfo
        .getNearRestaurant(lat, lon, distance)
        .then((res) => (this.nearByRestaurants = res.data))
    },
    getNearSites(lat, lon, distance) {
      return getCitysiteInfo
        .getNearSites(lat, lon, distance)
        .then((res) => (this.nearBySites = res.data))
    },
    getNearHotel(lat, lon, distance) {
      return getCitysiteInfo
        .getNearHotel(lat, lon, distance)
        .then((res) => (this.nearByHotels = res.data))
    },
    getGoogleMap(positionLat, positionLon) {
      let googleMapAddress = `https://maps.google.com/maps?q=${positionLat},${positionLon}&z=16&output=embed`
      this.googleMap = googleMapAddress
    },
  },
  created() {
    console.log('created')
    if (this.id.startsWith('C1')) {
      console.log('景點')
      this.getSite()
        .then((res) => {
          console.log(res, '呼叫餐廳')
          this.getNearRestaurant(
            res.PositionLat,
            res.PositionLon,
            this.distance,
          )
          return res
        })
        .then((res) => {
          console.log(res, '呼叫住宿')
          this.getNearHotel(res.PositionLat, res.PositionLon, this.distance)
          return res
        })
        .then((res) => {
          this.getGoogleMap(res.PositionLat, res.PositionLon)
        })
      return
    }
  },
  beforeRouteUpdate(to) {
    console.log('jump')
    let nextId = to.params.id
    let nextCity = to.params.city
    if (nextId.startsWith('C4')) {
      this.getHotel(nextCity, nextId)
    } else {
      this.getRestaurant(nextCity, nextId)
    }
  },
}
</script>

<style lang="scss" scoped>
.thumbnail_area {
  display: flex;
  gap: 10px;
  overflow: scroll;
}
.site_info {
  figure {
    height: 450px;
    margin-bottom: 20px;
    position: relative;
    .changePage_button {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: white;
      position: absolute;
      top: 5%;
      left: 5%;
      cursor: pointer;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
  }
  article {
    margin: 0 40px 20px;
    letter-spacing: 1px;
    &:first-letter {
      font-size: 28px;
      font-weight: 900;
    }
  }
}

.site_info_des {
  display: flex;
  flex-direction: column;
  text-align: start;
  margin: 0 40px 20px;

  h4 {
    font-size: 28px;
  }
  > * {
    margin-bottom: 20px;
  }
  li {
    > img {
      margin-right: 10px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
}

section {
  background: orange;
  padding: 20px 0 10px 0;
  position: relative;
}
.nearBy_area {
  .title {
    font-size: 24px;
    font-weight: 800;
    padding-left: 40px;
    text-align: start;
    color: black;
  }
}
</style>
