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

  // Signals für Formular-Status
  username = signal('');
  password = signal('');
  errorMessage = signal('');
  isLoading = signal(false);

  async onLogin() {
    // Validierung: Eingabefelder dürfen nicht leer sein
    if (!this.username() || !this.password()) {
      this.errorMessage.set('Benutzername und Passwort dürfen nicht leer sein.');
      return;
    }

    this.errorMessage.set('');
    this.isLoading.set(true);

    try {
      // Trigger Login Flow
      // Hinweis: Da wir OIDC (Authentik) nutzen, findet die eigentliche Authentifizierung
      // nach dem Redirect statt. Das lokale Formular dient hier der User Story Anforderung.
      await this.authService.login();
    } catch (error) {
      this.errorMessage.set('Ein Fehler ist aufgetreten.');
      this.isLoading.set(false);
    }
  }
}
