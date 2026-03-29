export interface Account {
  id?: number;
  user: {id: number};
  name: string;
  accountType: string;
  currency: string;
  initialBalance: number;
}
