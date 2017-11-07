import * as moment from 'moment'

class SF1SearchConditionItem {
  op: string
  value: string
  mode: string
  from: Date
  to: Date

  constructor() {
    this.op = 'AND'
    this.value = ''
    this.mode = '0'
    this.from = null
    this.to = null
  }
}

class SF1SearchCondition {
  id: number
  name: Array<string>
  title: string
  items = Array<SF1SearchConditionItem>()

  constructor(id: number, name: Array<string>, title: string) {
    this.id = id
    this.name = name
    this.title = title

    this.newItem()
  }

  newItem() {
    const v = new SF1SearchConditionItem()
    this.items.push(v)
  }

  removeItemAt(index) {
    this.items.splice(index, 1)
  }

  getValue() {
    let v = ''
    let p=''

    for (let i = 0; i < this.items.length; i++) {
      const it = this.items[i]
      if (it.value.trim() !== '') {
        if (v !== '') {
          v += (' ' + it.op + ' ')
        }
        else {
          p=it.op
        }
        v += it.value
      }
    }

    if (v === '') {
      return ''
    }

    let r = ''

    for (let i = 0; i < this.name.length; i++) {
      if (i > 0) {
        r += ' or '
      }
      r += (this.name[i] + '=(' + v + ')')
    }

    if (r !== '') {
      r = (p +' (' + r + ')')
    }

    return r
  }

  getDateValue() {
    let v = ''
    let p =''

    for (let i = 0; i < this.items.length; i++) {
      const it = this.items[i]
      let f = it.from
      let t = it.to

      let fs = ''
      let ts = ''

      switch (it.mode) {
        case '1':
          if (t !== null) {
            f = new Date('1970-01-01')
          }
          break
        case '2':
          if (f !== null) {
            t = new Date()
          }
          break
        case '3':
          if (f !== null) {
            t = f
          }
          break
      }

      if (f !== null && t !== null) {
        fs = moment(f).format('YYYYMMDD')
        ts = moment(t).format('YYYYMMDD')

        let r = ''

        for (let j = 0; j < this.name.length; j++) {
          if (r !== '') {
            r += ' OR '
          }
          r += (this.name[j] + '=(' + fs + ' to ' + ts + ')')
        }

        if (r !== '') {
          if (v !== '') {
            v += (' ' + it.op + ' ')
          }
          else{
            p=it.op
          }
          v += r
        }
      }
    }

    if (v !== '') {
      v = (p+' (' + v + ')')
    }
    return v
  }
}

export class SF1SearchExp {
  key_group: Array<SF1SearchCondition>
  code_group: Array<SF1SearchCondition>
  type_group: Array<SF1SearchCondition>
  name_group: Array<SF1SearchCondition>
  date_group: Array<SF1SearchCondition>

  lastKeyWord: string

  db_group: any[] = [
    { id: 0, name: '全部数据', sub_types: [] },
    {
      id: 1, name: '中国', sub_types: [
        { id: 1, code: 'FMZL', name: '中国发明专利' },
        { id: 2, code: 'FMSQ', name: '中国发明授权' },
        { id: 3, code: 'SYXX', name: '中国实用新型' },
        { id: 4, code: 'WGZL', name: '中国外观专利' },
        { id: 5, code: 'TWZL', name: '台湾' },
        { id: 6, code: 'HKPATENT', name: '香港' },
      ]
    },
    {
      id: 2, name: '主要国家和组织', sub_types: [
        { id: 1, code: 'USPATENT', name: '美国' },
        { id: 2, code: 'GBPATENT', name: '英国' },
        { id: 3, code: 'FRPATENT', name: '法国' },
        { id: 4, code: 'DEPATENT', name: '德国' },
        { id: 5, code: 'CHPATENT', name: '瑞士' },
        { id: 6, code: 'JPPATENT', name: '日本' },
        { id: 7, code: 'RUPATENT', name: '俄罗斯' },
        { id: 8, code: 'KRPATENT', name: '韩国' },
        { id: 9, code: 'EPPATENT', name: '欧洲专利局(EPO)' },
        { id: 10, code: 'WOPATENT', name: '世界知识产权组织(WIPO)' },
      ]
    },
    {
      id: 3, name: '其它国家和地区', sub_types: [
        { id: 1, code: 'GCPATENT', name: '阿拉伯' },
        { id: 2, code: 'AUPATENT', name: '澳大利亚' },
        { id: 3, code: 'CAPATENT', name: '加拿大' },
        { id: 4, code: 'ESPATENT', name: '西班牙' },
        { id: 5, code: 'ATPATENT', name: '奥地利' },
        { id: 6, code: 'ITPATENT', name: '意大利' },
        { id: 7, code: 'APPATENT', name: '非洲地址' },
        { id: 8, code: 'SEPATENT', name: '瑞典' },
        { id: 9, code: 'ASPATENT', name: '东南亚' },
        { id: 10, code: 'OTHERPATENT', name: '更多其它国家' },
      ]
    },
  ]

  constructor() {
    this.clear()
  }

  private initGroup(data: any[], group: Array<SF1SearchCondition>) {
    for (let i = 0; i < data.length; i++) {
      const cond = new SF1SearchCondition(data[i].id, data[i].name, data[i].title)
      group.push(cond)
    }
  }

  clear() {
    this.lastKeyWord = ''

    this.db_group[0].checked = true
    this.dbCheckAll(true)

    this.key_group = Array<SF1SearchCondition>()
    this.code_group = Array<SF1SearchCondition>()
    this.type_group = Array<SF1SearchCondition>()
    this.name_group = Array<SF1SearchCondition>()
    this.date_group = Array<SF1SearchCondition>()

    const k: any[] = [
      { id: 1, name: ['名称', '摘要', '权利要求书', '说明书'], title: '所有字段' },
      { id: 2, name: ['名称', '摘要'], title: '专利名称/摘要' },
      { id: 3, name: ['名称', '摘要', '权利要求书'], title: '专利名称/摘要/权利要求' },
      { id: 4, name: ['名称'], title: '专利名称' },
      { id: 5, name: ['摘要'], title: '摘要' },
      { id: 6, name: ['权利要求书'], title: '权利要求' },
      { id: 8, name: ['说明书'], title: '说明书' },
    ]
    this.initGroup(k, this.key_group)

    const c: any[] = [
      { id: 1, name: ['申请号'], title: '申请号' },
      { id: 2, name: ['公开（公告）号'], title: '公开（公告）号' },
      { id: 3, name: ['优先权'], title: '优先权号' },
    ]
    this.initGroup(c, this.code_group)

    const t: any[] = [
      { id: 1, name: ['分类号'], title: '国际分类号（IPC）' },
      // { id: 2, name: [], title: '外观分类(Locarno)' },
    ]
    this.initGroup(t, this.type_group)

    const n: any[] = [
      { id: 1, name: ['申请（专利权）人'], title: '申请（专利权）人' },
      // { id: 2, name: [], title: '当前专利权人' },
      // { id: 3, name: [], title: '股票代码' },
      { id: 4, name: ['发明（设计）人'], title: '发明人' },
      { id: 5, name: ['代理人'], title: '代理人' },
      { id: 6, name: ['专利代理机构'], title: '代理机构' },
      { id: 8, name: ['地址'], title: '申请人地址' },
    ]
    this.initGroup(n, this.name_group)

    const d: any[] = [
      { id: 1, name: ['申请日'], title: '申请日' },
      { id: 2, name: ['公开（公告）日'], title: '公开（公告）日' },
      { id: 3, name: ['优先权日'], title: '授权日' },
    ]
    this.initGroup(d, this.date_group)
  }

  buildKeySearch(text: string) {
    this.clear()
    this.lastKeyWord = text
    this.key_group[0].items[0].value = text
    return this.getValue()
  }

  buildCodeSearch(text: string) {
    this.clear()
    this.lastKeyWord = text
    this.type_group[0].items[0].value = text
    return this.getValue()
  }

  private getValueByGroup(group: Array<SF1SearchCondition>) {
    if (group == null) {
      return ''
    }
    let v = ''
    for (let i = 0; i < group.length; i++) {
      const r = group[i].getValue()
      if (r !== '') {
        if (v !== '') {
          v += ' '
        }
        v += r
      }
    }

    return v
  }

  private getDateValueByGroup(group: Array<SF1SearchCondition>) {
    if (group == null) {
      return ''
    }

    let v = ''

    for (let i = 0; i < group.length; i++) {
      const r = group[i].getDateValue()
      if (r !== '') {
        if (v !== '') {
          v += ' '
        }
        v += r
      }
    }

    return v
  }

  getValue() {
    // let j=JSON.stringify(this.date_group)

    const k = this.getValueByGroup(this.key_group)
    const c = this.getValueByGroup(this.code_group)
    const t = this.getValueByGroup(this.type_group)
    const n = this.getValueByGroup(this.name_group)
    const d = this.getDateValueByGroup(this.date_group)

    let v = k

    if (c !== '' && v !== '') {
      v += ' '
    }
    v += c

    if (t !== '' && v !== '') {
      v += ' '
    }
    v += t

    if (n !== '' && v !== '') {
      v += ' '
    }
    v += n

    if (d !== '' && v !== '') {
      v += ' '
    }
    v += d

    if (v.startsWith('AND') || v.startsWith('NOT')){
      return v.substr(4,v.length-4)
    }
    else if (v.startsWith('OR')){
      return v.substr(3,v.length-3)
    }

    return v
  }

  dbCheckAll(bl: boolean) {
    this.db_group.forEach((g) => {
      g.checked = bl
      g.sub_types.forEach((t) => {
        t.checked = bl
      })
    })
  }

  onDBGroupChange(g) {
    if (g.id === 0) {
      this.dbCheckAll(g.checked)
    } else {
      this.db_group[0].checked = false
      g.sub_types.forEach((v) => {
        v.checked = g.checked
      })
    }
  }

  onDBSubChange(g, t) {
    g.checked = false
    this.db_group[0].checked = false
  }

  getDBValue() {
    // let j=JSON.stringify(this.db_group[0])

    let r = ''

    this.db_group.forEach((g) => {
      g.sub_types.forEach((t) => {
        if (t.checked) {
          r += ((r === '') ? '' : ',')
          r += t.code
        }
      })
    })

    return r
  }

  private getKeyWordsFromGroup(group: Array<SF1SearchCondition>, s: Array<string>) {
    group.forEach((v) => {
      v.items.forEach((w) => {
        if ((w.value === '') || (w.op === 'NOT')) {
          return
        }
        const i = s.indexOf(w.value)
        if (i < 0) {
          s.push(w.value)
        }
      })

    })
  }

  getKeyWords() {
    const s = Array<string>()

    this.getKeyWordsFromGroup(this.key_group, s)
    this.getKeyWordsFromGroup(this.code_group, s)
    this.getKeyWordsFromGroup(this.type_group, s)
    this.getKeyWordsFromGroup(this.name_group, s)

    return s
  }


}
