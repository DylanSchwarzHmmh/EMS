import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {LogoutWindowComponent} from "../logout.window/logout.window.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    LogoutWindowComponent
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  isLogoutVisible = signal(false);

  openLogout(): void {
    this.isLogoutVisible.set(true);
  }

  closeLogout(): void {
    this.isLogoutVisible.set(false);
  }
}
