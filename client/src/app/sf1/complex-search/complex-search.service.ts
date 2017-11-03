
export class ComplexSearchConditionItem {
  op: string;
  value: string;

  constructor() {
    this.op = "AND";
    this.value = "";
  }
}

export class ComplexSearchCondition {
  id: number;
  name: Array<string>;
  title: string;
  items = Array<ComplexSearchConditionItem>();

  constructor(id: number, name: Array<string>, title: string) {
    this.id = id;
    this.name = name;
    this.title = title;

    this.newItem();
  }

  newItem() {
    let v = new ComplexSearchConditionItem();
    this.items.push(v);
  }

  removeItemAt(index) {
    this.items.splice(index, 1);
  }

  getValue() {
    let v = "";
    for (let i = 0; i < this.items.length; i++) {
      let it = this.items[i];
      if (it.value.trim() != "") {
        if (v != "") v += (" " + it.op + " ")
        v += it.value
      }
    }

    if (v == "") return "";

    let r = "";

    for (let i = 0; i < this.name.length; i++) {
      if (i > 0) r += " and ";
      r += (this.name[i] + "=(" + v + ")");
    }

    return r;
  }

}

export class ComplexSearchExp {
  key_group = Array<ComplexSearchCondition>();
  code_group = Array<ComplexSearchCondition>();
  type_group = Array<ComplexSearchCondition>();
  name_group = Array<ComplexSearchCondition>();

  constructor() {
  }

  private initGroup(data:any[],group:Array<ComplexSearchCondition>){
    for (let i = 0; i < data.length; i++) {
      let cond = new ComplexSearchCondition(data[i].id, data[i].name, data[i].title);
      group.push(cond);
    }
  }
  
  initKeyGroup(data: any[]) {
    this.initGroup(data,this.key_group);
  }

  initCodeGroup(data: any[]) {
    this.initGroup(data,this.code_group);
  }

  initTypeGroup(data: any[]) {
    this.initGroup(data,this.type_group);
  }

  initNameGroup(data: any[]) {
    this.initGroup(data,this.name_group);
  }

  private getValueByGroup(group: Array<ComplexSearchCondition>) {
    let v = "";

    for (var i = 0; i < group.length; i++) {
      let r = group[i].getValue();
      if (r != "") {
        if (v != "") v += " and ";
        v += r;
      }
    }

    return v;
  }

  getValue() {
    let k = this.getValueByGroup(this.key_group);
    let c = this.getValueByGroup(this.code_group);
    let t = this.getValueByGroup(this.type_group);
    let n = this.getValueByGroup(this.name_group);

    let v = k;

    if (c != "" && v != "") v += " and ";
    v += c;

    if (t != "" && v != "") v += " and ";
    v += t;

    if (n != "" && v != "") v += " and ";
    v += n;

    return v;
  }


}