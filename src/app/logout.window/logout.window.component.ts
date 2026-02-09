import {Component, inject, output} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-logout-window',
  standalone: true,
  imports: [],
  templateUrl: './logout.window.component.html',
  styleUrl: './logout.window.component.css',
})
export class LogoutWindowComponent {
  private authService = inject(AuthService);

  closeEvent = output<void>();

  logout(): void {
    this.authService.logout();
  }

  close(): void {
    this.closeEvent.emit();
  }
}
