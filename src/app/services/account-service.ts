import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl: string = 'http://localhost:8081/accounts';

  constructor(private http: HttpClient) {}

  getMyAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/my-accounts`);
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/new-account`, account);
  }

  updateAccount(account: Account): Observable<Account>{
    return this.http.put<Account>(`${this.apiUrl}/update-account`, account);
  }

  deleteAccount(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/delete-account/${id}`);
  }

  getTotalBalance(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-balance`);
  }

}
