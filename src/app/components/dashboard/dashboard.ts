import { Component } from '@angular/core';
import {AccountService} from '../../services/account-service';
import {TransactionService} from '../../services/transaction-service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  totalBalance: number = 0;
  totalIncome: number = 0;
  totalExpenses: number = 0;

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.accountService.getTotalBalance().subscribe({
      next: (data) => this.totalBalance = data,
      error: (err) => console.error("Error fetching balance", err)
    });

    this.transactionService.getTotalIncome().subscribe({
      next: (data) => this.totalIncome = data,
      error: (err) => console.error("Error fetching income", err)
    });

    this.transactionService.getTotalExpenses().subscribe({
      next: (data) => this.totalExpenses = data,
      error: (err) => console.error("Error fetching expenses", err)
    });
  }

  get netCashFlow(): number {
    return this.totalIncome - this.totalExpenses;
  }

}
