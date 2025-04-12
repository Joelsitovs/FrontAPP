import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  title = 'Register';
  googleText = 'Register with Google';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['usuario']
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
    // if (this.form.valid) {
    //   this.auth.registerAdmin(this.form.value).subscribe({
    //     next: (res) => {
    //       console.log('form', this.form.value);
    //       console.log(res);
    //       this.message = 'User registered successfully';
    //       this.auth.saveSession(res.token, res.user_id);
    //       this.router.navigate(['/dashboard']);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.errormessage = err.error.detail;
    //       console.log(this.errormessage);

    //     },
    //   });
    // }
  }
}
