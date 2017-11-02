
export class ComplexSearchConditionItem{
    op:string;
    value:string;
  
    constructor(){
      this.op="AND";
      this.value="";
    }
  }
  
  export class ComplexSearchCondition {
    id:number;
    name:string;
    title:string;
    items=Array<ComplexSearchConditionItem>();
    
    constructor(id:number, name:string, title:string) {
      this.id=id;
      this.name=name;
      this.title=title;
      
      this.newItem();
      
    }

    newItem(){
      let v=new ComplexSearchConditionItem();
      this.items.push(v);
    }
  }