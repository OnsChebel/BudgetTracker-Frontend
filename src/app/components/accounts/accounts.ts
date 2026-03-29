import { Component } from '@angular/core';
import {Account} from '../../models/account.model';
import {AccountService} from '../../services/account-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-accounts',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts {
  accounts: Account[] = [];

  showForm: boolean = false;
  isEditMode : boolean = false;

  currentAccount: Account = {
    user:{id : 1},
    name: ' ',
    accountType: ' ',
    currency: ' ',
    initialBalance: 0
  };

  constructor(private accountService: AccountService) {
  }

  ngOnInit() : void {
    this.loadAccounts();
  }

  loadAccounts() : void {
    this.accountService.getAllAccounts().subscribe({
      next: (data: Account[]) => {
        this.accounts = data;
        console.log('Data from database', this.accounts);
      },
      error: (err) => {
        console.error("Error fetching accounts: " + err);
      }
    })
  }

  openAddForm(): void {
    this.isEditMode = false;
    this.showForm = true;
    this.resetForm();
  }

  openEditForm(acc: Account): void {
    this.isEditMode = true;
    this.showForm = true;
    this.currentAccount= {...acc};
  }

  closeForm(): void {
    this.showForm = false;
  }

  saveAccount(){
    const dataToSend={...this.currentAccount};

    if(this.isEditMode && this.currentAccount.id) {
      this.accountService.updateAccount(dataToSend).subscribe({
        next: ()=>{ this.loadAccounts(); this.closeForm();},
        error: (err)=>console.error('Update Error:', err)
      });
    } else {
      this.accountService.createAccount(dataToSend).subscribe({
        next: ()=>{ this.loadAccounts(); this.closeForm();},
        error: (err)=>console.error('Save Error:', err)
      })
    }
  }

  deleteAccount(id: number | undefined){
    if(id && confirm('Are you sure you want to delete this account?')) {
      this.accountService.deleteAccount(id).subscribe({
        next: () => this.loadAccounts()
      });
    }
  }

  resetForm(){
    this.currentAccount = {
      user: {id : 1},
      name: ' ',
      accountType: ' ',
      currency: ' ',
      initialBalance: 0
    }
  }
}
