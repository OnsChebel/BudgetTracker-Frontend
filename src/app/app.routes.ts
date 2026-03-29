import { Routes } from '@angular/router';
import {Accounts} from './components/accounts/accounts';
import {Budgets} from './components/budgets/budgets';
import {Transactions} from './components/transactions/transactions';
import {Categories} from './components/categories/categories';
import {Dashboard} from './components/dashboard/dashboard';
import {Login} from './components/login/login';

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
  }
];
