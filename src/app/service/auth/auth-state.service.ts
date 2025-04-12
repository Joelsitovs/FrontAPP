import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private authState = new BehaviorSubject<any>(null);

  authState$ = this.authState.asObservable();

  constructor() {
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');

    if (token && token.trim() !== '' && uid) {
      this.authState.next({ token, uid });
    }
  }
  setUser(user: any) {
    this.authState.next(user);
  }
  clearUser() {
    this.authState.next(null);
  }
}
