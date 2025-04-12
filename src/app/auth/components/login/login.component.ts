import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GoogleLoginComponent } from '../google-login/google-login.component';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    GoogleLoginComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get email() {
    return this.form.get('email') as FormControl;
  }
  get password() {
    return this.form.get('password') as FormControl;
  }

  message: string = '';
  errorMessage: string = '';
  onSubmit() {
    if (this.form.valid) {
      this.authService
        .login(this.email.value, this.password.value)
        .then((response) => {
          console.log('form', this.form.value);
          console.log(response);
          this.message = 'User logged in successfully';
          this.route.queryParams.subscribe((params) => {
            const returnUrl = params['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
          });
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = error.message;
        });
    }
  }
}
