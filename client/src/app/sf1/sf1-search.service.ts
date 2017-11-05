
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

    if (r!='') r='('+r+')'

    return r
  }

  getDateValue(){
    let v=''

    for (let i=0; i<this.items.length;i++){
      const it = this.items[i]
      let f=it.from;
      let t=it.to;

      let fs=''
      let ts=''

      switch(it.mode){
        case '1':
          if (t!=null) {
            f=new Date('1970-01-01');
          }
          break;
        case '2':
          if (f!=null){
            t=new Date();
          }
          break;
        case '3':
        if (f!=null){
          t=f;
        }
        break;
      }

      if (f!=null && t!=null){
        fs=moment(f).format("YYYYMMDD");
        ts=moment(t).format("YYYYMMDD");
        
        let r='';

        for (let j=0;j<this.name.length;j++){
          if (r!='') {
            r+=' OR '
          }
          r+=(this.name[j]+'=('+fs+' to '+ts+')')
        }

        if (r!=''){
          if (v!=''){
            v+=(' '+it.op+' ')
          }
          v+=r
        }
      }
    }

    if (v!=''){
      v='('+v+')'
    }
    return v;
  }

}

export class SF1SearchExp {
  key_group = Array<SF1SearchCondition>()
  code_group = Array<SF1SearchCondition>()
  type_group = Array<SF1SearchCondition>()
  name_group = Array<SF1SearchCondition>()
  date_group = Array<SF1SearchCondition>()

  constructor() {
  }

  private initGroup(data: any[], group: Array<SF1SearchCondition>){
    for (let i = 0; i < data.length; i++) {
      const cond = new SF1SearchCondition(data[i].id, data[i].name, data[i].title)
      group.push(cond)
    }
  }

  initKeyGroup(data: any[]) {
    this.initGroup(data, this.key_group)
  }

  initCodeGroup(data: any[]) {
    this.initGroup(data, this.code_group)
  }

  initTypeGroup(data: any[]) {
    this.initGroup(data, this.type_group)
  }

  initNameGroup(data: any[]) {
    this.initGroup(data, this.name_group)
  }

  initDateGroup(data: any[]) {
    this.initGroup(data, this.date_group)
  }
  
  private getValueByGroup(group: Array<SF1SearchCondition>) {
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
    //let j=JSON.stringify(this.date_group);
    
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


}
