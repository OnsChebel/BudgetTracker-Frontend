import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  newUser: User = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  };

  errorMessage = '';
  isLoading = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    this.errorMessage = '';
    this.isLoading = true;

    this.userService.createUser(this.newUser).subscribe({
      next: (response) => {
        this.isLoading = false;
        alert("Account created successfully! Please log in.");
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = "Failed to create account. That email or username might already be in use.";
        console.error(err);
      }
    });
  }
}
