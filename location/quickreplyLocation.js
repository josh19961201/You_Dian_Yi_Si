export default async (event) => {
  try {
    const reply = {
      type: 'text',
      text: '請選擇地點',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'location',
              label: '請選擇地點'
            }
          }
        ]
      }
    }
    event.reply(reply)
  } catch (error) {
    event.reply('系統錯誤，請稍後再試')
  }
}
