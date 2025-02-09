import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = signal<boolean>(false);
  userName: string | null = null;
  menuVisible = false; 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();

    this.authService.authStatus.subscribe(status => {
      this.isLoggedIn.set(status);
      if (status) {
        this.userName = this.authService.getUserName();
      } else {
        this.userName = null;
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.isLoggedIn.set(false);
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible; 
  }
}
