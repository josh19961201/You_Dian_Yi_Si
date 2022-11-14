import axios from 'axios'
import 'dotenv/config'
// import cheerio from 'cheerio'

export default async (address) => {
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`
    )
    const showCoordinate = [
      parseFloat(data.results[0].geometry.location.lat),
      parseFloat(data.results[0].geometry.location.lng)
    ]
    address.showCoordinate(showCoordinate)
  } catch (error) {
    address.showCoordinate([0, 0])
  }
}
