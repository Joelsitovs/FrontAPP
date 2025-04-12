import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { GoogleLoginComponent } from '../google-login/google-login.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule,GoogleLoginComponent,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  title = 'Register';
  googleText = 'Register with Google';
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get email() {
    return this.form.get('email') as FormControl;
  }
  get password() {
    return this.form.get('password') as FormControl;
  }

  message: string = '';
  errormessage: string = '';

  onSubmit() {
    this.authService.register(this.email.value, this.password.value )
      .then((response) => {
        console.log('form', this.form.value);
        console.log(response);
        this.message = 'User registered successfully';
      })
      .catch((error) => {
        console.error(error);
        this.errormessage = error.message;
      });

  }
}
