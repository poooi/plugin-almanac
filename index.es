import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import _ from 'lodash'
import { MaterialIcon } from 'views/components/etc/icon'

// const __ = window.i18n['poi-plugin-almanac'].__.bind(window.i18n['poi-plugin-almanac'])

const weeks = ['日', '一', '二', '三', '四', '五', '六']

const directions = ['北方', '东方', '南方', '西方', '天花板', '地板']

const activities = [
  {
    name: '大型舰建造',
    good: '4k/6k/6k/3k走起！8小时！',
    bad: '4k/6k/6k/3k走起！4小时！',
  },
  {
    name: '普通舰建造',
    good: '彩底舰娘不是梦',
    bad: '2-4-11，哐哐哐哐',
  },
  {
    name: '开发%t',
    good: '三星装备滚滚来',
    bad: '机铳企鹅有点多',
  },
  {
    name: '肝日常任务',
    good: '任务清空速度有如罗盘娘相助',
    bad: '沟、沟、沟',
  },
  {
    name: '爆肝远征',
    good: '刷闪顺利，补给完毕，走起！',
    bad: '今天肝有点疼…',
  },
  {
    name: '推图',
    good: '出击道中门神BOSS一气呵成',
    bad: '出击道中门神…猫神',
  },
  {
    name: '氪金',
    good: '买买买，别犹豫',
    bad: '荷包大破中',
  },
  {
    name: '抢新号',
    good: '抢号一次成功',
    bad: '记错抢号时间',
  },
  {
    name: '刷稀有舰娘',
    good: '酒匂！大鲸！初风！天津风！',
    bad: '2-4-11，哐哐哐哐',
  },
  {
    name: '收舰娘本子',
    good: '艦これ漫画满载而归！',
    bad: '漢これ漫画…怎么有点不对？',
  },
  {
    name: '晒船晒装备',
    good: '人之初性本晒',
    bad: 'Fire！',
  },
  {
    name: '和舰娘结婚',
    good: '本日为结婚良辰吉日',
    bad: '不好了舰娘逃婚了',
  },
  {
    name: '肝船练级',
    good: '肝船顺利，等级飞涨',
    bad: '1-1…她竟然…大破了…',
  },
  {
    name: '刷战果',
    good: '舰娘状态良好，随时待命',
    bad: '猫神心情不太好',
  },
  {
    name: '推EO地图',
    good: 'Boss一发入魂，勋章手到擒来',
    bad: '劝退无极限',
  },
  {
    name: '上G+舰娘社群',
    good: '最新消息不容错过',
    bad: '欧提来晒啦，大家快跑啊',
  },
  {
    name: '改修装备',
    good: '一口气上10星，不费劲',
    bad: '改修失败有点多',
  },
]

const tools = ['飞机', '主炮', '电探', '反潜', '炮弹']

const varNames = ['jieguo', 'huodong', 'pay', 'expire', 'zhangdan', 'every', 'free', 'i1', 'a', 'virtual', 'ad', 'spider', 'mima', 'pass', 'ui']

const drinks = ['驱逐舰', '轻巡洋舰', '重巡洋舰', '战列巡洋舰', '战列舰', '轻空母', '航空母舰', '潜水艇', '扬陆舰', '重雷装巡洋舰', '航空巡洋舰', '航空战列舰', '水上机母舰', '装甲空母', '潜水空母', '训练巡洋舰', '工作舰']

const random = (dayseed, indexseed) => {
  let n = dayseed % 11117
  _.times(100 + indexseed, () => {
    n *= n
    n %= 11117
  })
  return n
}

const star = num => new Array(num).fill('★')
  .concat(new Array(5 - num).fill('☆'))
  .join('')

const pickRandom = (iday, array, size) => {
  const result = array.slice()
  _.each(_.range(array.length - size), (j) => {
    const index = random(iday, j) % result.length
    result.splice(index, 1)
  })
  return result
}

const parse = (e, iday) => {
  const result = Object.clone(e)
  if (result.name.indexOf('%v') !== -1) {
    result.name = result.name.replace('%v', varNames[random(iday, 12) % varNames.length])
  }
  if (result.name.indexOf('%t') !== -1) {
    result.name = result.name.replace('%t', tools[random(iday, 11) % tools.length])
  }
  if (result.name.indexOf('%l') !== -1) {
    result.name = result.name.replace('%l', ((random(iday, 12) % 247) + 30).toString())
  }
  return result
}

const pickRandomActivity = (iday, _activities, size) => {
  const pickedEvents = pickRandom(iday, _activities, size)
  return pickedEvents.map((event, i) => parse(event, i))
}

const bbRecipe = (iday, num) => {
  let r
  switch (num) {
    case 1:
      r = [4000, 6000, 6000, 2000]
      break
    case 2:
      r = [6000, 5000, 6000, 2000]
      break
    default:
      r = [4000, 6000, 6000, 3000]
  }

  const zc = (random(iday, 7) % 10) + 1

  let zc2 = 1
  if (zc <= 4 && zc > 0) {
    zc2 = 1
  } else if (zc <= 8 && zc > 4) {
    zc2 = 20
  } else {
    zc2 = 100
  }
  return [
    r[0] + ((random(iday, 73) % 49) * 10),
    r[1] + ((random(iday, 61) % 49) * 10),
    r[2] + ((random(iday, 59) % 49) * 10),
    r[3] + ((random(iday, 89) % 49) * 10),
    zc2,
  ]
}

const cvRecipe = (iday, num) => {
  let r
  switch (num) {
    case 1:
      r = [3500, 3500, 6000, 6000]
      break
    case 2:
      r = [4000, 2000, 5000, 5200]
      break
    default:
      r = [4000, 2000, 5000, 6500]
  }
  const zc = (random(iday, 11) % 10) + 1

  let zc2 = 1
  if (zc <= 4 && zc > 0) {
    zc2 = 1
  } else if (zc <= 8 && zc > 4) {
    zc2 = 20
  } else {
    zc2 = 100
  }
  return [
    r[0] + ((random(iday, 31) % 49) * 10),
    r[1] + ((random(iday, 37) % 49) * 10),
    r[2] + ((random(iday, 91) % 49) * 10),
    r[3] + ((random(iday, 101) % 49) * 10),
    zc2,
  ]
}

const css = `
.almanac-icon {
  width: 1em;
}
`


class Almanac extends Component {
  constructor(props) {
    super(props)
    const today = new Date()
    this.state = {
      iday: (today.getFullYear() * 10000) + ((today.getMonth() + 1) * 100) + today.getDate(),
    }
    this.handleRefreshDay = this._handleRefreshDay.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(this.handleRefreshDay, 60000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  _handleRefreshDay() {
    const today = new Date()
    const newIday = (today.getFullYear() * 10000) + ((today.getMonth() + 1) * 100) + today.getDate()
    if (this.state.iday !== newIday) {
      this.setState({
        iday: newIday,
      })
    }
  }

  render() {
    const today = new Date()
    const numGood = (random(this.state.iday, 99) % 3) + 2
    const numBad = (random(this.state.iday, 89) % 3) + 2
    const eventArr = pickRandomActivity(this.state.iday, activities, numGood + numBad)
    const bb = bbRecipe(this.state.iday, random(this.state.iday, 11) % 4)
    const cv = cvRecipe(this.state.iday, random(this.state.iday, 13) % 4)
    return (
      <div
        style={{
          padding: '1em',
        }}
      >
        <style>{css}</style>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <h4>
            今天是 {today.getFullYear()} 年 {today.getMonth() + 1} 月 {today.getDate()} 日 星期{weeks[today.getDay()]}
          </h4>
          {
            <div>
              <div
                style={{
                  display: 'flex',
                  color: '#000',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 100,
                    backgroundColor: '#ffee44',
                    fontSize: 23,
                  }}
                >
                  <strong>宜</strong>
                </div>
                <div
                  style={{
                    flex: 1,
                    backgroundColor: '#ffffaa',
                    paddingBottom: 10,
                  }}
                >
                  {
                    _.range(numGood).map(i => (
                      <div key={i}>
                        <h4 style={{ color: '#222' }}><strong>{eventArr[i].name}</strong></h4>
                        <div
                          style={{
                            color: '#777',
                            fontSize: '90%',
                          }}
                        >
                          {eventArr[i].good}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  color: '#000',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 100,
                    backgroundColor: '#ff4444',
                    fontSize: 23,
                    color: '#fff',
                  }}
                >
                  不宜
                </div>
                <div
                  style={{
                    flex: 1,
                    backgroundColor: '#ffddd3',
                    paddingBottom: 10,
                  }}
                >
                  {
                    _.range(numBad).map(i => (
                      <div key={-i}>
                        <h4><strong>{eventArr[numGood + i].name}</strong></h4>
                        <div
                          style={{
                            color: '#777',
                            fontSize: '90%',
                          }}
                        >
                          {eventArr[numGood + i].bad}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          }
        </div>
        <div
          style={{
            paddingLeft: 10,
            paddingTop: 10,
          }}
        >
          <div>
            <FontAwesome name="hand-o-up" />
            <strong> 座位朝向：</strong>
            面向
            <strong
              style={{
                color: '#4a4',
              }}
            >
              {directions[random(this.state.iday, 2) % directions.length]}
            </strong>
            赌船赌装备，脸最白。
          </div>
          <div>
            <FontAwesome name="heart-o" />
            <strong> 推荐秘书：</strong>
            {pickRandom(this.state.iday, drinks, 2).join('，')}
          </div>
          <div>
            <FontAwesome name="compass" />
            <strong> 罗盘指数：</strong>
            <strong
              style={{
                color: '#ff4444',
              }}
            >
              {star((random(this.state.iday, 6) % 5) + 1)}
            </strong>
          </div>
          <div><FontAwesome name="ship" /><strong> 战舰公式：</strong>
            <span>
              <MaterialIcon materialId={1} className="almanac-icon" /> {`${bb[0]} `}
              <MaterialIcon materialId={2} className="almanac-icon" /> {`${bb[1]} `}
              <MaterialIcon materialId={3} className="almanac-icon" /> {`${bb[2]} `}
              <MaterialIcon materialId={4} className="almanac-icon" /> {`${bb[3]} `}
              <MaterialIcon materialId={7} className="almanac-icon" /> {`${bb[4]} `}
            </span>
          </div>
          <div><FontAwesome name="fighter-jet" /><strong> 空母公式：</strong>
            <span>
              <MaterialIcon materialId={1} className="almanac-icon" /> {`${cv[0]} `}
              <MaterialIcon materialId={2} className="almanac-icon" /> {`${cv[1]} `}
              <MaterialIcon materialId={3} className="almanac-icon" /> {`${cv[2]} `}
              <MaterialIcon materialId={4} className="almanac-icon" /> {`${cv[3]} `}
              <MaterialIcon materialId={7} className="almanac-icon" /> {`${cv[4]} `}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export const reactClass = Almanac
