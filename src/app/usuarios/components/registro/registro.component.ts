import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';
import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { SharedModule } from 'src/app/shared/shared.module';
@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule,SharedModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit {
  imagenSeleccionada: File | null = null;
  previewUrl: string | null = null;
  uid: string | null = null;
  maxFecha: any;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenSeleccionada = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.imagenSeleccionada);
    }
  }

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      dni: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.pattern('^[a-zA-Z0-9]+$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: ['', [Validators.required, this.fechaFutura]],
    });
  }

  fechaFutura(control: FormControl) {
    const fecha = new Date(control.value);
    const hoy = new Date();
    return fecha > hoy ? { fechaFutura: true } : null;
  }

  get nombre() {
    return this.form.get('nombre') as FormControl;
  }
  get dni() {
    return this.form.get('dni') as FormControl;
  }
  get email() {
    return this.form.get('email') as FormControl;
  }
  get fecha_nacimiento() {
    return this.form.get('fecha_nacimiento') as FormControl;
  }

  respuesta: string = '';
  
  mostrarRespuesta: boolean = false;
  respuestaError: string = '';
  mostrarError: boolean = false;

  formatoFecha(fecha: string) {
    return fecha.replace(/-/g, '/');
  }
  ngOnInit() {
    this.uid = localStorage.getItem('uid');
    this.maxFecha = new Date().toISOString().split('T')[0];
  }

  async onSubmit() {
    if (this.form.valid) {
      const formData = {
        ...this.form.value,
        foto_perfil: this.previewUrl ?? null,
        created_by: this.uid,
      };

      this.userService.register(formData).subscribe({
        next: (response) => {
          console.log('Usuario creado:', response);
          this.toast.show('Usuario registrado correctamente', 'success');
          if (this.imagenSeleccionada) {
            this.userService
              .uploadImagenPerfil(this.form.value.dni, this.imagenSeleccionada)
              .subscribe({
                next: (response) => {
                  console.log('Imagen subida:', response);
                },
                error: (error) => {
                  console.error('Error al subir imagen:', error);
                  this.respuestaError = 'Error al subir imagen';
                },
                complete: () => {
                  console.log('Subida de imagen completada');
                },
              });
          }

          this.form.reset();
          this.previewUrl = null;
        },
        error: (error) => {
          const mensaje =
            error?.error?.detail?.[0]?.msg?.replace(/^"(.*)"$/, '$1') ||
            'Error al registrar usuario';
          this.toast.show(mensaje, 'error');
          console.error('Error:', mensaje);
        },
        complete: () => {
          console.log('Registro completado');
        },
      });
    }
  }


  @ViewChild('toast', { static: true })
toast!: ToastComponent;


// probarToast() {
//   // this.toast.show('Este es un mensaje de prueba 🎉', 'success');
//   this.toast.show('Este es un mensaje de prueba', 'info');
// }

}
