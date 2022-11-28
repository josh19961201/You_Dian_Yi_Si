import 'dotenv/config'
import linebot from 'linebot'
import fetchExhibition from './commands/fetchExhibition.js'
import fetchDance from './commands/fetchDance.js'
import fetchDrama from './commands/fetchDrama.js'
import fetchConcert from './commands/fetchConcert.js'
import quickReply from './quickreply/quickreply.js'
import quickReplyLocation from './location/quickreplyLocation.js'
import express from 'express'

const app = express()

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
  } else if (event.message.type === 'text') {
    if (event.message.text.split(',')[0] === '展覽查詢') {
      fetchExhibition(event)
    } else if (event.message.text.split(',')[0] === '音樂演出查詢') {
      fetchConcert(event)
    } else if (event.message.text.split(',')[0] === '舞蹈演出查詢') {
      fetchDance(event)
    } else if (event.message.text.split(',')[0] === '戲劇演出查詢') {
      fetchDrama(event)
    } else {
      event.reply('哎呀，我聽不懂你在說什麼...', quickReplyLocation(event))
    }
  } else {
    quickReplyLocation(event)
  }
})

const linebotParser = bot.parser()

app.post('/', linebotParser)

app.get('/', (req, res) => {
  res.status(200).send('ok')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
