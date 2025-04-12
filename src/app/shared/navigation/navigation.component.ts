// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// // import { AuthService } from 'src/app/service/auth/auth.service';
// // import { AuthStateService } from 'src/app/service/auth/auth-state.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-navigation',
//   imports: [CommonModule, RouterModule],
//   templateUrl: './navigation.component.html',
//   styleUrl: './navigation.component.css',
// })
// export class NavigationComponent {
//   isLoggedIn = false;
//   authChecked = false;
//   private authSubscription!: Subscription;

//   constructor(
//     // private authService: AuthService,
//     // private authStateService: AuthStateService
//   ) {}
//   async ngOnInit() {
//     // this.authSubscription = this.authStateService.authState$.subscribe(
//     //   (user) => {
//     //     this.isLoggedIn = !!user;
//     //     this.authChecked = true;
//     //   }
//     // );
//   }
//   async logout() {
//     // await this.authService.logout();
//     // console.log('User logged out');
//   }
//   ngOnDestroy(): void {
//     this.authSubscription?.unsubscribe();
//   }
// }
