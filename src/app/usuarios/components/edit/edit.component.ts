import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastComponent } from 'src/app/shared/toast/toast.component';
@Component({
  selector: 'app-edit',
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  cargando: boolean = false;
  form: FormGroup;
  id: string = '';
  fechaParaInputDate: string = '';
  imagenSeleccionada: File | null = null;
  previewUrl: string | null = null;
  usuario: any = {};
  respuesta: string = '';
  respuestaError: string = '';
  maxFecha: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
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
      foto_perfil: [''],
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

  ngOnInit(): void {
    this.maxFecha = new Date().toISOString().split('T')[0];

    this.route.paramMap.subscribe((params) => {
      this.id = params.get('dni')!;

      this.cargarUsuario(this.id);
    });
  }

  cargarUsuario(dni: string) {
    this.cargando = true;
    this.userService.getUserById(dni).subscribe({
      next: (response) => {
        console.log(response);
        const data = response.data;

        this.form.patchValue({
          nombre: data.nombre,
          dni: data.dni,
          email: data.email,
          fecha_nacimiento: data.fecha_nacimiento,
          foto_perfil: data.foto_perfil,
        });
        this.previewUrl = data.foto_perfil ?? null;

        this.usuario = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar usuario:', error);
        this.cargando = false;
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenSeleccionada = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
        this.form.patchValue({
          foto_perfil: reader.result,
        });
      };
      reader.readAsDataURL(this.imagenSeleccionada);
    }
  }
  guardarCambios() {
    const formValue = this.form.value;

    const sinCambios =
      formValue.nombre === this.usuario.nombre &&
      formValue.dni === this.usuario.dni &&
      formValue.email === this.usuario.email &&
      formValue.fecha_nacimiento === this.usuario.fecha_nacimiento &&
      formValue.foto_perfil === this.usuario.foto_perfil;
    if (sinCambios && !this.imagenSeleccionada) {
      this.toast.show("No se han realizado cambios", 'info');

      return;
    }

    if (this.imagenSeleccionada) {
      this.userService
        .uploadImagenPerfil(this.id, this.imagenSeleccionada)
        .subscribe({
          next: (res) => {
            console.log('Imagen subida:');
            const imageUrl = res.url!;

            this.form.controls['foto_perfil'].setValue(imageUrl);

            this.enviarFormulario();
          },
          error: (err) => {
            console.error(' Error al subir imagen:', err);
            this.toast.show('Error al subir imagen', 'error');

          
          },
        });
    } else {
      this.enviarFormulario();
    }
  }

  enviarFormulario() {
    this.userService.editUser(this.id, this.form.value).subscribe({
      next: (response) => {
        console.log(' Usuario actualizado:', response);
        this.toast.show('Usuario actualizado correctamente', 'success');
      },
      error: (err) => {
        console.error(' Error al actualizar usuario:', err);
        this.toast.show('Error al actualizar usuario', 'error');
        this.respuestaError = 'Error al actualizar usuario';
      },
    });
  }

  @ViewChild('toast', { static: true })
  toast!: ToastComponent;
}
