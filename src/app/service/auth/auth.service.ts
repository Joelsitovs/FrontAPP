import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { firstValueFrom } from 'rxjs';
import { AuthStateService } from './auth-state.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private url = environment.apiUrl;
  private auth: Auth = inject(Auth);
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authStateService: AuthStateService
  ) {}

  saveSession(token: string, user_id: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('uid', user_id);
    console.log('url', this.url);
  }
  async login(email: string, password: string): Promise<any> {
    try {
      const { user } = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        this.router.navigate(['/auth/verify-email']);
        return Promise.reject('Correo de verificación enviado');
      }

      const token = await user.getIdToken();
      this.saveSession(token, user.uid);
      this.authStateService.setUser({ token, uid: user.uid });

      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([returnUrl || '/']);
      return Promise.resolve('Usuario logueado');
    } catch (err: any) {
      return Promise.reject(this.mapAuthError(err.code));
    }
  }
  async register(email: string, password: string): Promise<any> {
    try {
      const { user } = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      await sendEmailVerification(user);

      const token = await user.getIdToken();
      this.saveSession(token, user.uid);

      await firstValueFrom(this.http.post(`${this.url}/assign-role`, {}));
      const refreshedToken = await user.getIdToken(true);
      localStorage.setItem('token', refreshedToken);

      this.authStateService.setUser({ token, uid: user.uid });

      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([returnUrl || '/']);
      return Promise.resolve(
        'Usuario registrado y correo de verificación enviado'
      );
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      localStorage.clear();
      this.authStateService.clearUser();
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async resetPassword(email: string): Promise<string> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return 'Correo de recuperación enviado';
    } catch (error) {
      return Promise.reject(
        'Error al enviar el correo de restablecimiento de contraseña'
      );
    }
  }
  async sendEmailVerification(): Promise<string> {
    const user: User | null = this.auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        return 'Correo de verificación enviado';
      } catch {
        return Promise.reject('Error al enviar el correo de verificación');
      }
    }
    return Promise.reject('Usuario no encontrado');
  }
  async signInWithGoogle(): Promise<any> {
    try {
      const { user } = await signInWithPopup(
        this.auth,
        new GoogleAuthProvider()
      );
      const token = await user.getIdToken();
      this.saveSession(token, user.uid);

      await firstValueFrom(
        this.http.post(`${this.url}/assign-role`, {})
      );
      const refreshedToken = await user.getIdToken(true);
      localStorage.setItem('token', refreshedToken);
      this.authStateService.setUser({ token, uid: user.uid });

      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([returnUrl || '/']);
      return Promise.resolve('Usuario logueado con Google');
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }

  private mapAuthError(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return 'Usuario no encontrado';
      case 'auth/wrong-password':
      case 'auth/invalid-email':
        return 'Email o contraseña incorrectos';
      case 'auth/too-many-requests':
        return 'Demasiados intentos. Intente más tarde';
      case 'auth/invalid-credential':
        return 'Credenciales inválidas';
      case 'auth/email-already-in-use':
        return 'Email ya en uso';
      case 'auth/weak-password':
        return 'Contraseña débil';
      default:
        return 'Error desconocido';
    }
  }

}