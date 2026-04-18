import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category-service';
import {Category} from '../../models/category.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categories: Category[] = [];

  showForm = false;
  isEditMode = false;

  currentCategory: Category = {
    name: '',
    icon: ''
};

  constructor(private categoryService: CategoryService) {}

  ngOnInit():void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getMyCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        console.log('Data from database:', this.categories);
      },
      error: (err) => {
        console.error("Error fetching categories: " + err);
      }
    });
  }

  openAddForm(){
    this.isEditMode = false;
    this.showForm = true;
    this.resetForm();
  }

  openEditForm(cat: Category){
    this.isEditMode = true;
    this.showForm = true;
    this.currentCategory= {...cat};
  }

  closeForm(){
    this.showForm = false;
  }

  saveCategory(){
    const dataToSend = {...this.currentCategory};

    if (this.isEditMode && this.currentCategory.id) {
      this.categoryService.updateCategory(dataToSend).subscribe({
        next: () => { this.loadCategories(); this.closeForm(); },
        error: (err) => console.error('Update Error:', err)
      });
    } else {
      this.categoryService.createCategory(dataToSend).subscribe({
        next: () => { this.loadCategories(); this.closeForm(); },
        error: (err) => console.error('Save Error:', err)
      });
    }
  }

  deleteCategory(id: number | undefined) {
    if (id && confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => this.loadCategories()
      });
    }
  }

  resetForm(){
    this.currentCategory = {
      name: '',
      icon: ''
    };
  }




}
