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
      // const oneWeekLater = DateTime.fromISO(today).plus({ days: 7 }).toISODate()
      const startDate = show.startDate.replaceAll('/', '-')
      const endDate = show.endDate.replaceAll('/', '-')
      if (today <= startDate) continue

      //   地點判斷
      const userCoordinate = [
        parseFloat(event.message.text.split(',')[1]),
        parseFloat(event.message.text.split(',')[2])
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
      if (distance > 10) continue

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
    for (const show of exhibitions) {
      if (!show.footer.contents[0].action.uri) {
        delete show.footer
        show.body.contents[1].contents[2].contents[1].text =
          '無提供外部連結，相關資訊請自行搜尋'
      }
    }

    const reply = {
      type: 'flex',
      altText: '展覽查詢結果',
      contents: {
        type: 'carousel',
        contents: exhibitions
      }
    }
    if (exhibitions.length === 0) {
      event.reply('很抱歉，附近沒有符合條件的展覽')
    } else {
      event.reply(reply)
    }
    // writejson(reply, 'exhibitions')
  } catch (error) {
    // console.log(error)
    event.reply('系統錯誤，請稍後再試')
  }
}
