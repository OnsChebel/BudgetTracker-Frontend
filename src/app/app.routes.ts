import { Routes } from '@angular/router';
import {Accounts} from './components/accounts/accounts';
import {Budgets} from './components/budgets/budgets';
import {Transactions} from './components/transactions/transactions';
import {Categories} from './components/categories/categories';
import {Dashboard} from './components/dashboard/dashboard';
import {Login} from './components/login/login';
import {Loans} from './components/loans/loans';
import {Profile} from './components/profile/profile';
import {Signup} from './components/signup/signup';

export const routes: Routes = [
  {
    path:'', component: Login
  },
  {
    path: 'accounts', component: Accounts
  },
  {
    path: 'budgets', component: Budgets
  },
  {
    path: 'transactions', component: Transactions
  },
  {
    path:'categories', component: Categories
  },
  {
    path:'dashboard', component: Dashboard
  },
  {
    path: 'loans', component: Loans
  },
  {
    path: 'profile', component: Profile
  },
  {
    path: 'signup', component: Signup
  }
];
