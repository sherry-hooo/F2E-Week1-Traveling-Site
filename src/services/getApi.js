import axios from "axios";
import jsSHA from "jssha";

const apiClient = axios.create({
  baseURL: "https://ptx.transportdata.tw/MOTC/v2/Tourism/",
  withCredentials: false,
});

// 請求攔截器
apiClient.interceptors.request.use((config) => {
  config.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...getAuthorizationHeader(),
  };
  return config;
});

export default {
  getAllScenicSpotByCity(city) {
    return apiClient.get(`/ScenicSpot/${city}`, {
      params: {
        $select: "ScenicSpotID, ScenicSpotName, City, Picture",
        $format: "JSON",
      },
    });
  },
  getAllRestaurantByCity(city) {
    return apiClient.get(`/Restaurant/${city}`, {
      params: {
        $select: "RestaurantID, RestaurantName, City, Picture",
        $format: "JSON",
      },
    });
  },
  getAllHotelByCity(city) {
    return apiClient.get(`/Hotel/${city}`, {
      params: {
        $select: "HotelID, HotelName, City, Picture",
        $format: "JSON",
      },
    });
  },
  getCityActivity(city, month) {
    return apiClient.get(`/Activity/${city}`, {
      params: {
        $filter: `month(StartTime) eq ${month} or month(EndTime) eq ${
          month - 1
        }`,
        $format: "JSON",
      },
    });
  },
  getScenicSpot(city, id) {
    console.log(city, id);
    return apiClient.get(`/ScenicSpot/${city}`, {
      params: {
        $filter: `ScenicSpotID eq '${id}'`,
        $format: "JSON",
      },
    });
  },
  getRestaurant(city, id) {
    return apiClient.get(`/Restaurant/${city}`, {
      params: {
        $filter: `RestaurantID eq '${id}'`,
        $format: "JSON",
      },
    });
  },
  getHotel(city, id) {
    return apiClient.get(`/Hotel/${city}`, {
      params: {
        $filter: `HotelID eq '${id}'`,
        $format: "JSON",
      },
    });
  },
  getNearSites(lat, lon, distance) {
    return apiClient.get(
      "/ScenicSpot?$top=10&$spatialFilter=nearby(" +
        lat +
        "%2C%20" +
        lon +
        "%2C%20" +
        distance +
        ")&$format=JSON"
    );
  },
  getNearRestaurant(lat, lon, distance) {
    return apiClient.get(
      "/Restaurant?$top=10&$spatialFilter=nearby(" +
        lat +
        "%2C%20" +
        lon +
        "%2C%20" +
        distance +
        ")&$format=JSON"
    );
  },
  getNearHotel(lat, lon, distance) {
    return apiClient.get(
      "/Hotel?$top=10&$spatialFilter=nearby(" +
        lat +
        "%2C%20" +
        lon +
        "%2C%20" +
        distance +
        ")&$format=JSON"
    );
  },
};

function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  let AppID = "00889de6156c405baaaa9c20918d88a3";
  let AppKey = "i8WOUOLfmnnAoctsSdU4yp2dEpI";
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return { Authorization: Authorization, "X-Date": GMTString };
}
