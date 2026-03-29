import { Component } from '@angular/core';
import {Budget} from '../../models/budget.model';
import {Category} from '../../models/category.model';
import {BudgetService} from '../../services/budget-service';
import {CategoryService} from '../../services/category-service';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-budgets',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './budgets.html',
  styleUrl: './budgets.css',
})
export class Budgets {

  budgets: Budget[] = [];
  categories: Category[] = [];

  showForm: boolean = false;
  isEditMode: boolean = false;

  currentBudget: Budget ={
    user: {id: 1},
    category: {id: 0},
    limitAmount: 0,
    periodMonth: 0,
    periodYear: 0
  };

  constructor(private budgetService: BudgetService, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.loadBudgets();
    this.loadCategories();
  }

  loadBudgets() {
    this.budgetService.getAllBudgets().subscribe({
      next: (data : Budget[])=>{
        this.budgets = data;
        console.log('Data from database:', this.budgets);
      },
      error: (err) => {
        console.error('Error in fetching budgets:', err);
      }
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

  openAddForm() {
    this.isEditMode = false;
    this.showForm = true;
    this.resetForm();
  }

  openEditForm(bud: Budget) {
    this.isEditMode = true;
    this.showForm = true;
    this.currentBudget = { ...bud };
  }

  closeForm() {
    this.showForm = false;
  }

  saveBudget(){
    const dataToSend = {
      ...this.currentBudget
    };

    if(this.isEditMode && this.currentBudget.id){
      this.budgetService.updateBudget(this.currentBudget.id, dataToSend).subscribe({
        next: (data) => {this.loadBudgets(); this.closeForm();},
        error: (err) => console.error('Update Error:', err)
      });
    } else {
      this.budgetService.createBudget(dataToSend).subscribe({
        next: (data) => {this.loadBudgets(); this.closeForm();},
        error: (err) => console.error('Save Error:',err)
      });
    }
  }

  deleteBudget(id: number | undefined) {
    if(id && confirm('Are you sure you want to delete this budget?')) {
      this.budgetService.deleteBudget(id).subscribe({
        next: (data) => this.loadBudgets()
      });
    }
  }

  resetForm(){
    this.currentBudget = {
      user: {id: 1},
      category: {id: 0},
      limitAmount: 0,
      periodMonth: 0,
      periodYear: 0
    }
  }

}
