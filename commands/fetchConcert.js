import axios from 'axios'
import { DateTime } from 'luxon'
import template from '../templates/flexConcert.js'
import writejson from '../utils/writejson.js'

export default async (event) => {
  try {
    const { data } = await axios.get(
      'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=1'
    )
    let concerts = []

    data.forEach(function (show, index) {
      const bubble = JSON.parse(JSON.stringify(template))

      const today = DateTime.now().toISODate()
      const oneWeekLater = DateTime.fromISO(today).plus({ days: 7 }).toISODate()
      const startDate = show.startDate.replaceAll('/', '-')
      const endDate = show.endDate.replaceAll('/', '-')
      if (!(oneWeekLater >= startDate && today <= endDate)) return

      // if (!(show.showInfo[0].latitude || show.showInfo[0].longitude)) {
      //   addressTrans(show.showInfo[0].locationName)
      // } else {
      //   const coordinate = [
      //     show.showInfo[0].latitude,
      //     show.showInfo[0].longitude
      //   ]
      // }

      bubble.body.contents[0].text = show.title
      bubble.body.contents[1].contents[0].contents[1].text =
        show.showInfo[0].locationName
      if (startDate === endDate) {
        bubble.body.contents[1].contents[1].contents[1].text = startDate
      } else {
        bubble.body.contents[1].contents[1].contents[1].text = `${show.startDate} - ${show.endDate}`
      }
      bubble.footer.contents[0].action.uri = show.sourceWebPromote

      // 地點判斷

      concerts.push(bubble)
    })
    concerts = concerts.slice(0, 9)

    concerts.forEach(function (show, index) {
      if (!concerts[index].footer.contents[0].action.uri) {
        delete concerts[index].footer
        concerts[index].body.contents[1].contents[2].contents[1].text =
          '無提供外部連結，相關資訊請自行搜尋'
      }
    })

    const reply = {
      type: 'flex',
      altText: '音樂展演查詢結果',
      contents: {
        type: 'carousel',
        contents: concerts
      }
    }
    event.reply(reply)
    writejson(reply, 'concerts')
  } catch (error) {
    console.log(error)
  }
}
