export default async (event) => {
  try {
    const reply = {
      type: 'text',
      text: '請輸入想查詢的展演類型',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '戲劇',
              text: `戲劇演出查詢,${event.message.latitude},${event.message.longitude}`
            }
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '舞蹈',
              text: `舞蹈演出查詢,${event.message.latitude},${event.message.longitude}`
            }
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '音樂',
              text: `音樂演出查詢,${event.message.latitude},${event.message.longitude}`
            }
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '展覽',
              text: `展覽查詢,${event.message.latitude},${event.message.longitude}`
            }
          }
        ]
      }
    }
    event.reply(reply)
  } catch (error) {
    console.log(error)
  }
}
