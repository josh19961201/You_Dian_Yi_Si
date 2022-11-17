import axios from 'axios'
import cheerio from 'cheerio'

const url = 'https://www.google.com.tw/maps/search/'

const test = async function (text) {
  const { data } = await axios.get(`${url}${text}`)
  const $ = cheerio.load(data)
  return $('head')
    .find('meta')
    .eq(10)
    .attr('content')
    .split('center=')[1]
    .split('&zoom=')[0]
    .split('%2C')
}

console.log(await test('新竹市政府'))
