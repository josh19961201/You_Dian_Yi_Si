import 'dotenv/config'
import linebot from 'linebot'
import fetchExhibition from './commands/fetchExhibition.js'
// import fetchDance from './commands/fetchDance.js'
// import fetchDrama from './commands/fetchDrama.js'
// import fetchConcert from './commands/fetchConcert.js'
import quickReply from './quickreply/quickReply.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
let userLocation = []
if (!userLocation !== [0, 0]) {
  userLocation = [0, 0]
}

bot.on('message', async (event) => {
  if (event.message.type === 'location') {
    quickReply(event)
  }
  if (
    event.message.type === 'text' &&
    event.message.text.split(',')[0] === '展覽查詢'
  ) {
    fetchExhibition(event)
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
