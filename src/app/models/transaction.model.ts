export interface Transaction {
  id?: number;
  account : {id : number, name?: string};
  category: {id : number, name?: string, icon?: string};
  transactionDate: string;
  description: string;
  type:string;
  amount: number;
}
