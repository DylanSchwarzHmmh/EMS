import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal('');
  isLoading = signal(false);


  onSsoLogin(): void {
    this.errorMessage.set('');
    this.isLoading.set(true);
    try {
      this.authService.login();
    } catch (error) {
      this.errorMessage.set('Ein Fehler ist aufgetreten.');
      this.isLoading.set(false);
    }
  }
}
