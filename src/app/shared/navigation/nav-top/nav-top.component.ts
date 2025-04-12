import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { AuthStateService } from 'src/app/service/auth/auth-state.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-nav-top',
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-top.component.html',
  styleUrl: './nav-top.component.css',
})
export class NavTopComponent {
  isLoggedIn = false;
  authChecked = false;
  private authSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private authStateService: AuthStateService
  ) {}
  async ngOnInit() {
    this.authSubscription = this.authStateService.authState$.subscribe(
      (user) => {
        this.isLoggedIn = !!user;
        this.authChecked = true;
      }
    );
  }
  async logout() {
    await this.authService.logout();
    console.log('User logged out');
  }
  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
