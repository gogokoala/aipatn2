import * as moment from 'moment'

export class SF1SearchConditionItem {
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

export class SF1SearchCondition {
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
    for (let i = 0; i < this.items.length; i++) {
      const it = this.items[i]
      if (it.value.trim() !== '') {
        if (v !== '') {
          v += (' ' + it.op + ' ')
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
      r = '(' + r + ')'
    }

    return r
  }

  getDateValue() {
    let v = ''

    for (let i = 0; i < this.items.length; i++) {
      const it = this.items[i]
      let f = it.from;
      let t = it.to;

      let fs = ''
      let ts = ''

      switch (it.mode) {
        case '1':
          if (t !== null) {
            f = new Date('1970-01-01');
          }
          break;
        case '2':
          if (f !== null) {
            t = new Date();
          }
          break;
        case '3':
          if (f !== null) {
            t = f;
          }
          break;
      }

      if (f !== null && t !== null) {
        fs = moment(f).format('YYYYMMDD');
        ts = moment(t).format('YYYYMMDD');

        let r = '';

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
          v += r
        }
      }
    }

    if (v !== '') {
      v = '(' + v + ')'
    }
    return v;
  }
}

export class SF1SearchExp {
  key_group : Array<SF1SearchCondition>
  code_group : Array<SF1SearchCondition>
  type_group : Array<SF1SearchCondition>
  name_group : Array<SF1SearchCondition>
  date_group : Array<SF1SearchCondition>

  constructor() {
    this.clear();
  }

  private initGroup(data: any[], group: Array<SF1SearchCondition>) {
    for (let i = 0; i < data.length; i++) {
      const cond = new SF1SearchCondition(data[i].id, data[i].name, data[i].title)
      group.push(cond)
    }
  }

  clear(){
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
    ];
    this.initGroup(k,this.key_group);

    const c: any[] = [
      { id: 1, name: ['申请号'], title: '申请号' },
      { id: 2, name: ['公开（公告）号'], title: '公开（公告）号' },
      { id: 3, name: ['优先权'], title: '优先权号' },
    ];
    this.initGroup(c,this.code_group);

    const t: any[] = [
      { id: 1, name: ['分类号'], title: '国际分类号（IPC）' },
      // { id: 2, name: [], title: '外观分类(Locarno)' },
    ];
    this.initGroup(t,this.type_group);

    const n: any[] = [
      { id: 1, name: ['申请（专利权）人'], title: '申请（专利权）人' },
      // { id: 2, name: [], title: '当前专利权人' },
      // { id: 3, name: [], title: '股票代码' },
      { id: 4, name: ['发明（设计）人'], title: '发明人' },
      { id: 5, name: ['代理人'], title: '代理人' },
      { id: 6, name: ['专利代理机构'], title: '代理机构' },
      { id: 8, name: ['地址'], title: '申请人地址' },
    ];
    this.initGroup(n, this.name_group);

    const d: any[] = [
      { id: 1, name: ['申请日'], title: '申请日' },
      { id: 2, name: ['公开（公告）日'], title: '公开（公告）日' },
      { id: 3, name: ['优先权日'], title: '授权日' },
    ];
    this.initGroup(d,this.date_group);
  }

  buildKeySearch(text:string){
    this.clear();
    this.key_group[0].items[0].value=text
    return this.getValue();
  }

  buildCodeSearch(text:string){
    this.clear();
    this.type_group[0].items[0].value=text
    return this.getValue();
  }

  private getValueByGroup(group: Array<SF1SearchCondition>) {
    if (group==null) {
      return '';
    }
    let v = ''
    for (let i = 0; i < group.length; i++) {
      const r = group[i].getValue()
      if (r !== '') {
        if (v !== '') {
          v += ' and '
        }
        v += r
      }
    }

    return v
  }

  private getDateValueByGroup(group: Array<SF1SearchCondition>) {
    if (group==null) {
      return '';
    }
    
    let v = ''

    for (let i = 0; i < group.length; i++) {
      const r = group[i].getDateValue()
      if (r !== '') {
        if (v !== '') {
          v += ' ' + group[i].items[0].op + ' '
        }
        v += r
      }
    }

    return v
  }

  getValue() {
    // let j=JSON.stringify(this.date_group);

    const k = this.getValueByGroup(this.key_group)
    const c = this.getValueByGroup(this.code_group)
    const t = this.getValueByGroup(this.type_group)
    const n = this.getValueByGroup(this.name_group)
    const d = this.getDateValueByGroup(this.date_group)

    let v = k

    if (c !== '' && v !== '') {
      v += ' and '
    }
    v += c

    if (t !== '' && v !== '') {
      v += ' and '
    }
    v += t

    if (n !== '' && v !== '') {
      v += ' and '
    }
    v += n

    if (d !== '' && v !== '') {
      v += ' and '
    }
    v += d

    return v
  }

  private getKeyWordsFromGroup(group: Array<SF1SearchCondition>, s: Array<string>) {
    group.forEach((v) => {
      v.items.forEach((v) => {
        if ((v.value == '') || (v.op=='NOT') ) return;
        let i = s.indexOf(v.value);
        if (i < 0) {
          s.push(v.value);
        }
      });

    });
  }

  getKeyWords(){
    let s=Array<string>();

    this.getKeyWordsFromGroup(this.key_group,s);
    this.getKeyWordsFromGroup(this.code_group,s);
    this.getKeyWordsFromGroup(this.type_group,s);
    this.getKeyWordsFromGroup(this.name_group,s);

    return s;
  }


}
