import 'dotenv/config'
import linebot from 'linebot'
import fetchExhibition from './commands/fetchExhibition.js'
// import fetchDance from './commands/fetchDance.js'
// import fetchDrama from './commands/fetchDrama.js'
// import fetchConcert from './commands/fetchConcert.js'

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
  // if (event.message.type !== 'text' && event.message.type !== 'location') {
  //   event.reply('請輸入展演類別或地點')
  // }
  // if (event.message.text === '音樂表演' || event.message.type === 'location') {
  //   fetchConcert(event)
  // }
  if (event.message.type !== 'location') {
    event.reply('請輸入位置資訊')
    return
  }
  fetchExhibition(event)
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
