import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';
import { LoanScheduleRow } from '../models/loan-schedule-row.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'http://localhost:8081/loan';

  constructor(private http: HttpClient) {}

  getMyLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/my-loans`);
  }

  createLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(`${this.apiUrl}/new-loan`, loan);
  }

  deleteLoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-loan/${id}`);
  }

  getLoanSchedule(id: number): Observable<LoanScheduleRow[]> {
    return this.http.get<LoanScheduleRow[]>(`${this.apiUrl}/schedule/${id}`);
  }
}
