export interface Budget {
  id?: number;
  user: {id?:number};
  category: {id?:number, name?:string};
  limitAmount: number;
  periodMonth: number;
  periodYear: number;
}
