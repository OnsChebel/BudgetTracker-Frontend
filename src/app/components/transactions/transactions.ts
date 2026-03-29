import { Component, OnInit } from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {Transaction} from '../../models/transaction.model';
import {TransactionService} from '../../services/transaction-service';
import {FormsModule} from '@angular/forms';
import {Category} from '../../models/category.model';
import {Account} from '../../models/account.model';
import {CategoryService} from '../../services/category-service';
import {AccountService} from '../../services/account-service';

@Component({
  selector: 'app-transactions',
  imports: [CurrencyPipe, DatePipe, FormsModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {

  transactions: Transaction[] = [];
  categories: Category[] = [];
  accounts: Account[] = [];

  showForm = false;
  isEditMode = false;

  currentTransaction: Transaction = {
    account: {id: 0},
    category: {id : 0},
    transactionDate: '',
    description: '',
    type: 'EXPENSE',
    amount: 0
  };

  constructor(private transactionService: TransactionService, private categoryService: CategoryService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadTransactions();
    this.loadCategories();
    this.loadAccounts();
  }

  loadTransactions() {
    this.transactionService.getAllTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        console.log('Data from database:', this.transactions);
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);
      }
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

  loadAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => this.accounts = data,
      error: (err) => console.error('Error fetching accounts:', err)
    });
  }

  openAddForm() {
    this.isEditMode = false;
    this.showForm = true;
    this.resetForm();
  }

  openEditForm(txn: Transaction) {
    this.isEditMode = true;
    this.showForm = true;
    this.currentTransaction = { ...txn };
  }

  closeForm() {
    this.showForm = false;
  }


  saveTransaction() {
    const dataToSend = {
      ...this.currentTransaction
    };

    if (this.isEditMode && this.currentTransaction.id) {
      this.transactionService.updateTransaction(this.currentTransaction.id, dataToSend).subscribe({
        next: () => { this.loadTransactions(); this.closeForm(); },
        error: (err) => console.error('Update Error:', err)
      });
    } else {
      this.transactionService.createTransaction(dataToSend).subscribe({
        next: () => { this.loadTransactions(); this.closeForm(); },
        error: (err) => console.error('Save Error:', err)
      });
    }
  }

  deleteTransaction(id: number | undefined) {
    if (id && confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(id).subscribe({
        next: () => this.loadTransactions()
      });
    }
  }

  resetForm() {
    this.currentTransaction = {
      account: {id: 0},
      category: {id : 0},
      transactionDate: '',
      description: '',
      type:'EXPENSE',
      amount: 0
    };
  }
}
