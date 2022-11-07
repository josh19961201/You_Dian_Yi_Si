import axios from 'axios'
import { DateTime } from 'luxon'
import template from '../templates/flexConcert.js'

export default async (event) => {
  if (event.message.text === '音樂') {
    try {
      const { data } = await axios.get(
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=1'
      )
      const concerts = []
      data.forEach(function (show, index) {
        const today = DateTime.now().toISODate()
        const oneWeekLater = DateTime.fromISO(today)
          .plus({ days: 7 })
          .toISODate()
        // const oneMonthLater = DateTime.fromISO(today).plus({ months: 1 }).toISODate()

        const startDate = data[index].startDate.replaceAll('/', '-')
        const endDate = data[index].endDate.replaceAll('/', '-')

        const bubble = JSON.parse(JSON.stringify(template))

        if (oneWeekLater >= startDate && oneWeekLater <= endDate) {
          bubble.body.contents[0].text = show.title
          concerts.push(bubble)
          const reply = {
            type: 'flex',
            altText: '音樂展演查詢結果',
            contents: {
              type: 'carousel',
              contents: concerts
            }
          }
          event.reply(reply)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
