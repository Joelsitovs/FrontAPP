import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-google-login',
  imports: [CommonModule],
  templateUrl: './google-login.component.html',
  styleUrl: './google-login.component.css',
})
export class GoogleLoginComponent {
  @Input() text: string = 'Continuar con Google';
  constructor(private auth: AuthService) {}
  singInWithGoogle() {
    this.auth.signInWithGoogle();
  }
}
