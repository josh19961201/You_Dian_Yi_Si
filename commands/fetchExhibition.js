import axios from 'axios'
import { DateTime } from 'luxon'
import template from '../templates/flexConcert.js'
// import writejson from '../utils/writejson.js'
import addressTrans from '../location/addressTrans.js'
import distanceCalc from '../location/distanceCalc.js'

export default async (event) => {
  try {
    const { data } = await axios.get(
      'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6'
    )
    const exhibitions = []

    for (const show of data) {
      const bubble = JSON.parse(JSON.stringify(template))

      // 時間判斷
      const today = DateTime.now().toISODate()
      const startDate = show.startDate.replaceAll('/', '-')
      const endDate = show.endDate.replaceAll('/', '-')
      if (today <= startDate) continue

      //   地點判斷
      const userCoordinate = [
        parseFloat(event.message.latitude),
        parseFloat(event.message.longitude)
      ]

      if (show.showInfo[0].locationName.includes('線上')) continue

      let showCoordinate
      if (
        show.showInfo[0].latitude === null ||
        show.showInfo[0].longitude === null
      ) {
        showCoordinate = await addressTrans(show.showInfo[0].locationName)
      } else {
        showCoordinate = [
          parseFloat(show.showInfo[0].latitude),
          parseFloat(show.showInfo[0].longitude)
        ]
      }

      const distance = distanceCalc(
        userCoordinate[0],
        userCoordinate[1],
        showCoordinate[0],
        showCoordinate[1]
      )
      if (distance > 5) continue

      bubble.body.contents[0].text = show.title
      bubble.body.contents[1].contents[0].contents[1].text =
        show.showInfo[0].locationName
      if (startDate === endDate) {
        bubble.body.contents[1].contents[1].contents[1].text = startDate
      } else {
        bubble.body.contents[1].contents[1].contents[1].text = `${show.startDate} - ${show.endDate}`
      }
      bubble.footer.contents[0].action.uri = show.sourceWebPromote

      exhibitions.push(bubble)
      if (exhibitions.length > 9) break
    }
    exhibitions.forEach(function (show, index) {
      if (!exhibitions[index].footer.contents[0].action.uri) {
        delete exhibitions[index].footer
        exhibitions[index].body.contents[1].contents[2].contents[1].text =
          '無提供外部連結，相關資訊請自行搜尋'
      }
    })

    const reply = {
      type: 'flex',
      altText: '展覽查詢結果',
      contents: {
        type: 'carousel',
        contents: exhibitions
      }
    }
    event.reply(reply)
    // writejson(reply, 'exhibitions')
  } catch (error) {
    console.log(error)
  }
}
