import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl: string = 'http://localhost:8081/Account';

  constructor(private http: HttpClient) {}

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/allaccounts`);
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/newaccount`, account);
  }

  updateAccount(account: Account): Observable<Account>{
    return this.http.put<Account>(`${this.apiUrl}/updateaccount`, account);
  }

  deleteAccount(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/deleteaccount/${id}`);
  }

}
