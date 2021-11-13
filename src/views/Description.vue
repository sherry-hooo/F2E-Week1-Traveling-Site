<template>
  <div class="site_info">
    <figure class="site_info_img">
      <img
        v-if="siteInfo.Picture.PictureUrl1"
        :src="siteInfo.Picture.PictureUrl1"
        :alt="siteInfo.Picture.PictureUrl1PictureDescription1"
      />
      <img v-else src="@/assets/citiesImg/replacedImg2.jpg" />
    </figure>
    <ul class="site_info_des">
      <h1 class="title">{{ siteInfo.Name }}</h1>
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
      {{ siteInfo.DescriptionDetail }}
      <!-- {{ googlePosition }} -->
    </article>
    <iframe
      :src="getGoogleMap"
      frameborder="0"
      width="100%"
      height="300px"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
// import citySite from '@/components/CitySite.vue'
import getCitysiteInfo from '@/services/getCitysiteInfo.js'

export default {
  props: ['name', 'id', 'city', 'description', 'cityLink'],
  data() {
    return {
      event: null,
      siteInfo: {},
      // googlePosition: [
      //   this.siteInfo.Position.PositionLon,
      //   this.siteInfo.Position.PositionLat,
      // ],
    }
  },
  computed: {
    getGoogleMap() {
      return `http://maps.google.com/maps?q=${this.siteInfo.Position.PositionLat},${this.siteInfo.Position.PositionLon}&z=16&output=embed`
    },
  },
  created() {
    getCitysiteInfo
      .getSite(this.cityLink, this.id)
      .then((res) => (this.siteInfo = res.data[0]))
      .catch((err) => console.log(err))
  },
}
</script>

<style lang="scss" scoped>
.site_info {
  // padding: 0 20px;
  figure {
    height: 450px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    text-align: start;
    margin: 0 40px 20px;
    > * {
      margin-bottom: 20px;
    }
    > img {
      margin-right: 10px;
    }

    .address {
    }
    .copy_button {
    }
    .tel {
    }
    .time {
    }
    .price {
    }
    .remark {
    }
  }

  article {
    margin: 0 40px 20px;
  }
}
</style>
