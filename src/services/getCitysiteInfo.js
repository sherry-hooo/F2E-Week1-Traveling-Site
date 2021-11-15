import axios from 'axios'
import jsSHA from 'jssha'

const apiClient = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...getAuthorizationHeader(),
  },
})

export default {
  getCity(city, total, skip = 0) {
    return apiClient.get(
      '/ScenicSpot/' +
        city +
        '?$top=' +
        total +
        '&$skip=' +
        skip +
        '&$format=JSON',
    )
  },
  getSite(city, id) {
    return apiClient.get(
      '/ScenicSpot/' +
        city +
        '?$filter=ID%20eq%20' +
        `'${id}'` +
        '&$format=JSON',
    )
  },
  getRestaurant(city, id) {
    return apiClient.get(
      '/Restaurant/' +
        city +
        '?$filter=ID%20eq%20' +
        `'${id}'` +
        '&$format=JSON',
    )
  },
  getHotel(city, id) {
    console.log(
      apiClient.get(
        '/Hotel/' + city + '?$filter=ID%20eq%20' + `'${id}'` + '&$format=JSON',
      ),
    )
    return apiClient.get(
      '/Hotel/' + city + '?$filter=ID%20eq%20' + `'${id}'` + '&$format=JSON',
    )
  },
  getNearSites(lat, lon, distance) {
    return apiClient.get(
      '/ScenicSpot?$top=10&$spatialFilter=nearby(' +
        lat +
        '%2C%20' +
        lon +
        '%2C%20' +
        distance +
        ')&$format=JSON',
    )
  },
  getNearRestaurant(lat, lon, distance) {
    return apiClient.get(
      '/Restaurant?$top=10&$spatialFilter=nearby(' +
        lat +
        '%2C%20' +
        lon +
        '%2C%20' +
        distance +
        ')&$format=JSON',
    )
  },
  getNearHotel(lat, lon, distance) {
    return apiClient.get(
      '/Hotel?$top=10&$spatialFilter=nearby(' +
        lat +
        '%2C%20' +
        lon +
        '%2C%20' +
        distance +
        ')&$format=JSON',
    )
  },
}

function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  let AppID = '00889de6156c405baaaa9c20918d88a3'
  let AppKey = 'i8WOUOLfmnnAoctsSdU4yp2dEpI'
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toGMTString()
  let ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  let HMAC = ShaObj.getHMAC('B64')
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"'
  return { Authorization: Authorization, 'X-Date': GMTString }
}
