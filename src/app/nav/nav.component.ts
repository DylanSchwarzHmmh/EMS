import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {LogoutWindowComponent} from "../logout.window/logout.window.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  openLogout(): void {
  }
}
