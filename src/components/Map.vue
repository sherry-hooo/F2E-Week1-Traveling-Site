<template>
  <div id="map"></div>
</template>

<script>
import citiesList from "@/assets/data/citiesList.json";
import L from "leaflet";
// import { myMapToken } from "@/assets/data/mapboxToken.js";

export default {
  props: ["city"],
  data() {
    return {
      openStreetMap: null,
    };
  },
  methods: {
    getMap(centerPosition) {
      this.openStreetMap = L.map("map", {
        center: centerPosition,
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
        (this.marker = L.marker(centerPosition)
          .addTo(this.openStreetMap)
          .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
          .openPopup());
    },
    switchMapCenter(centerPosition) {
      console.log(centerPosition);
      this.openStreetMap.panTo(
        new L.LatLng(centerPosition[0], centerPosition[1])
      );
      this.openStreetMap.setZoom(13);
    },
  },
  computed: {
    cityPosition() {
      const position = citiesList.find(
        (city) => city.cityLink === this.city
      ).position;
      return [Number(position.lat), Number(position.lon)];
    },
  },
  async mounted() {
    this.getMap(this.cityPosition);
  },
  watch: {
    cityPosition() {
      this.switchMapCenter(this.cityPosition);
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
