import axios from 'axios'
import jsSHA from 'jssha'

const apiClient = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...getAuthorizationHeader(),
  },
})

export default {
  getCity(city) {
    return apiClient.get('/' + city + '?$top=30&$format=JSON')
  },
  getSite(city, id) {
    // return apiClient.get(`/${city}?$filter=contains(ID%2C "${id}")&$top=30&$format=JSON`)
    return apiClient.get(
      '/' +
        city +
        '?$filter=contains(ID%2C%27' +
        id +
        '%27)' +
        '&$top=30&$format=JSON',
    )
  },
  getTest() {
    return apiClient.get('/' + 'NewTaipei?$top=30&$format=JSON')
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
