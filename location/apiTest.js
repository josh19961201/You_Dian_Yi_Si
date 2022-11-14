import axios from 'axios'
import 'dotenv/config'
// import cheerio from 'cheerio'

const test = async (address) => {
  try {
    // const address = '國立傳統藝術中心宜蘭園區'
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`
    )
    const showCoordinate = await [
      parseFloat(data.results[0].geometry.location.lat),
      parseFloat(data.results[0].geometry.location.lng)
    ]
    return showCoordinate
  } catch (error) {
    console.log(error)
  }
}

console.log(test('國立傳統藝術中心宜蘭園區'))
// import axios from 'axios'
// import 'dotenv/config'
// // import cheerio from 'cheerio'

// const test = async (address) => {
//   address = '輔仁大學'
//   try {
//     const { data } = await axios.get(
//       `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`
//     )
//     return [
//       parseFloat(data.results[0].geometry.location.lat),
//       parseFloat(data.results[0].geometry.location.lng)
//     ]
//   } catch (error) {
//     return [0, 0]
//   }
// }
// console.log(test())
