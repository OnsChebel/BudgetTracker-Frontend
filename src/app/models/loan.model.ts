export interface Loan {
  id?: number;
  user: { id?: number };
  principal: number;
  annualInterest: number;
  loanTerm: number;
  description: string;
}
