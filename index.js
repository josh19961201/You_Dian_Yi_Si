import 'dotenv/config'
import linebot from 'linebot'
// import fetchExhibition from './commands/fetchExhibition.js'
// import fetchDance from './commands/fetchDance.js'
// import fetchDrama from './commands/fetchDrama.js'
import fetchConcert from './commands/fetchConcert.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', async (event) => {
  if (event.message.type !== 'text') {
    event.reply('唉呀！發生了一點小錯誤...')
  }
  if (event.message.text === '音樂展演') {
    fetchConcert(event)
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
