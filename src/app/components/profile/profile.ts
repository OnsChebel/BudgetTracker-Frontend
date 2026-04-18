import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  user: User = {
    username: '',
    email: '',
    firstName: '',
    lastName: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.getMyProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        this.errorMessage = "Could not load profile. Are you logged in?";
        console.error(err);
      }
    });
  }

  saveProfile() {
    this.successMessage = '';
    this.errorMessage = '';

    this.userService.updateUser(this.user).subscribe({
      next: (data) => {
        this.user = data;
        this.successMessage = 'Profile updated successfully!';
      },
      error: (err) => {
        this.errorMessage = "Failed to update profile.";
        console.error(err);
      }
    });
  }
}
