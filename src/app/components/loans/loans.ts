import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Loan } from '../../models/loan.model';
import { LoanScheduleRow } from '../../models/loan-schedule-row.model';
import { LoanService } from '../../services/loan-service';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './loans.html',
  styleUrl: './loans.css'
})
export class Loans implements OnInit {
  loans: Loan[] = [];
  selectedSchedule: LoanScheduleRow[] = [];

  showForm: boolean = false;

  currentLoan: Loan = {
    description: '',
    principal: 0,
    annualInterest: 0,
    loanTerm: 0
  } as Loan;

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans() {
    this.loanService.getMyLoans().subscribe({
      next: (data) => {
        this.loans = data;
        console.log('Data from database', this.loans);
      },
      error: (err) => console.error("Error fetching loans: "+err)
    });
  }

  saveLoan() {
    const dataToSend = { ...this.currentLoan };

      this.loanService.createLoan(dataToSend).subscribe({
        next: (data) => {this.loadLoans(); this.closeForm()},
        error: (err) => {console.error("Save Error: "+err)}
      })
  }

  deleteLoan(id: number |undefined) {
    if (id && confirm('Are you sure you want to delete this loan?')) {
      this.loanService.deleteLoan(id).subscribe({
        next: () => this.loadLoans()
      });
    }
  }

  viewSchedule(id: number) {
    this.loanService.getLoanSchedule(id).subscribe({
      next: (data) => {
        this.selectedSchedule = data
      },
      error: (err) => console.error("Could not fetch schedule", err)
    });
  }

  openAddForm() {
    this.showForm = true;
    this.resetForm();
    this.selectedSchedule = [];
  }

  closeForm() {
    this.showForm = false;
  }

  resetForm() {
    this.currentLoan = {
      description: '',
      principal: 0,
      annualInterest: 0,
      loanTerm: 0
    } as Loan;
  }
}
