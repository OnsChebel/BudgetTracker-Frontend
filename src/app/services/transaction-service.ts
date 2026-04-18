import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transaction} from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:8081/transactions';

  constructor(private http: HttpClient) { }

  getMyTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/my-transactions`);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/new-transaction`, transaction);
  }

  updateTransaction(id: number, transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/update-transaction`, transaction);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-transaction/${id}`);
  }

  getTotalIncome(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-income`);
  }

  getTotalExpenses(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-expense`);
  }

}
