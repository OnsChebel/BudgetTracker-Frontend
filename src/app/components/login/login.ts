import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  constructor(private router: Router) {
  }

  onSubmit() {
    console.log("logged in with email: " , this.email , "and this password: " , this.password);
    this.router.navigate(['dashboard']);
  }

}
