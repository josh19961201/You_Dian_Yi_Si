import axios from 'axios'
import 'dotenv/config'

const test = async (address) => {
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`
    )
    const showLat = data.results[0].geometry.location.lat
    const showLng = data.results[0].geometry.location.lng
    console.log(showLat, showLng)
  } catch (error) {
    return error
  }
}

test('台北101')
