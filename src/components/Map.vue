<template>
  <div id="map"></div>
</template>

<script>
import L from "leaflet";
// import { myMapToken } from "@/assets/data/mapboxToken.js";

export default {
  data() {
    return {
      openStreetMap: null,
    };
  },
  methods: {
    getMap() {
      // target location
      this.openStreetMap = L.map("map", {
        center: [25.0408578889, 121.567904444],
        // 可以嘗試改變 zoom 的數值
        // 筆者嘗試後覺得 18 的縮放比例是較適當的查詢範圍
        zoom: 13,
      });

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1Ijoic2hlcnJ5aG8iLCJhIjoiY2t3Mzc4djhxZTFyZDJvczdmeXFpdDY1diJ9.wpSDjKWWn5Nm_f5Y1oeGaA",
        }
      ).addTo(this.openStreetMap),
        // 標記 icon
        (this.marker = L.marker([25.0408578889, 121.567904444])
          .addTo(this.openStreetMap)
          .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
          .openPopup());
    },
  },
  mounted() {
    this.getMap();
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
