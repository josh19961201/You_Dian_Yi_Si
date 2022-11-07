export default {
  type: 'bubble',
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: '樹德科技大學表演藝術系 演出實務I《碎片之島》',
        weight: 'bold',
        size: 'xl',
        margin: 'none',
        maxLines: 3,
        style: 'normal',
        decoration: 'none',
        align: 'start',
        gravity: 'center'
      },
      {
        type: 'box',
        layout: 'vertical',
        margin: 'lg',
        spacing: 'sm',
        contents: [
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'md',
            contents: [
              {
                type: 'text',
                text: '地點',
                color: '#aaaaaa',
                size: 'sm',
                flex: 1
              },
              {
                type: 'text',
                text: '樹德科技大學 行政大樓 B2 實驗劇場',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5
              }
            ]
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: 'Time',
                color: '#aaaaaa',
                size: 'sm',
                flex: 1
              },
              {
                type: 'text',
                text: '2022/12/24 18:00:00',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5
              }
            ]
          }
        ]
      }
    ]
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    spacing: 'sm',
    contents: [
      {
        type: 'button',
        style: 'link',
        height: 'sm',
        action: {
          type: 'uri',
          label: '詳細資料',
          uri: 'https://linecorp.com'
        }
      },
      {
        type: 'box',
        layout: 'vertical',
        contents: [],
        margin: 'sm'
      }
    ],
    flex: 0
  },
  styles: {
    hero: {
      separator: true
    }
  }
}
