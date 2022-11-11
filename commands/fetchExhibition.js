import axios from 'axios'
import { DateTime } from 'luxon'
import template from '../templates/flexConcert.js'
import writejson from '../utils/writejson.js'
import googleMapsApi from '../location/googleMapsApi.js'
import distance from '../location/distance.js'

export default async (event) => {
  try {
    const { data } = await axios.get(
      'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6'
    )
    const concerts = []
    let x = 0

    data.forEach(function (show, index) {
      //   if (x > 9) return

      const bubble = JSON.parse(JSON.stringify(template))

      const today = DateTime.now().toISODate()
      //   const oneWeekLater = DateTime.fromISO(today).plus({ days: 7 }).toISODate()
      const startDate = show.startDate.replaceAll('/', '-')
      const endDate = show.endDate.replaceAll('/', '-')
      //   if (!(oneWeekLater >= startDate && today <= endDate)) return
      if (today <= startDate) return

      //   地點判斷
      const userCoordinate = [
        parseFloat(event.message.latitude),
        parseFloat(event.message.longitude)
      ]

      if (show.showInfo[0].locationName.includes('線上')) return

      let showCoordinate = []
      if (!(show.showInfo[0].latitude || show.showInfo[0].longitude)) {
        showCoordinate = googleMapsApi(show.showInfo[0].locationName)
      } else {
        showCoordinate = [
          parseFloat(show.showInfo[0].latitude),
          parseFloat(show.showInfo[0].longitude)
        ]
      }

      if (
        distance(
          userCoordinate[0],
          userCoordinate[1],
          showCoordinate[0],
          showCoordinate[1]
        ) >= 5
      ) {
        return
      }

      bubble.body.contents[0].text = show.title
      bubble.body.contents[1].contents[0].contents[1].text =
        show.showInfo[0].locationName
      if (startDate === endDate) {
        bubble.body.contents[1].contents[1].contents[1].text = startDate
      } else {
        bubble.body.contents[1].contents[1].contents[1].text = `${show.startDate} - ${show.endDate}`
      }
      bubble.footer.contents[0].action.uri = show.sourceWebPromote

      concerts.push(bubble)

      console.log(x)
      x++
    })
    // concerts = concerts.slice(0, 9)

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
