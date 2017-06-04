export class Todo
{
    _id:string;
    task:string =' ';
    isCompleted:boolean=false;
    constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}