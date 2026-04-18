import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Budget} from '../models/budget.model';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private apiUrl = 'http://localhost:8081/budgets';

  constructor(private http: HttpClient) {}

  getMyBudgets(): Observable<Budget[]>{
    return this.http.get<Budget[]>(`${this.apiUrl}/my-budgets`);
  }

  createBudget(budget: Budget): Observable<Budget>{
    return this.http.post<Budget>(`${this.apiUrl}/new-budget`, budget);
  }

  updateBudget(id: number, budget: Budget): Observable<Budget>{
    return this.http.put<Budget>(`${this.apiUrl}/update-budget`, budget);
  }

  deleteBudget(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/delete-budget/${id}`);
  }

}
