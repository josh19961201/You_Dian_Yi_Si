import axios from 'axios'
import 'dotenv/config'

const address = '台北101'
const location = await axios.get(
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`
)

const showLat = location.data.results[0].geometry.location.lat
const showLng = location.data.results[0].geometry.location.lng

console.log(showLat, showLng)
