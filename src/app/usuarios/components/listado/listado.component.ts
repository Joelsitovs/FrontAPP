import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/service/user/user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { QRCodeComponent } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from 'src/app/shared/toast/toast.component';

@Component({
  selector: 'app-listado',
  imports: [CommonModule, SharedModule, QRCodeComponent, FormsModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',
})
export class ListadoComponent {
  cargando: boolean = true;
  buscador: string = '';
  uid: string = '';
  usuarios: any[] = [];
  qrData: string = '';
  usuarioSeleccionadoDni: string | null = null;
  mostrarmodal: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.listUsers().subscribe({
      next: (response) => {
        this.usuarios = response.usuarios;
        this.cargando = false;
        console.log(this.usuarios);
      },
      error: (error) => {
        console.log(error);
        this.cargando = false;
      },
      complete: () => {
        console.log('Petición completada');
      },
    });

    this.qrData = JSON.stringify(this.usuarios);
  }

  generateQRCode(usuario: any) {
    return JSON.stringify({
      nombre: usuario.nombre,
      dni: usuario.dni,
      email: usuario.email,
      fecha_nacimiento: usuario.fecha_nacimiento,
    });
  }
  qrAmpliado: string = '';

  abrirQR(usuario: any) {
    this.qrAmpliado = this.generateQRCode(usuario);
  }
  cerrarQR() {
    this.qrAmpliado = '';
  }

  get usuariosFilter() {
    const texto = this.buscador.toLowerCase();
    return this.usuarios.filter(
      (usuario) =>
        usuario.nombre.toLowerCase().includes(texto) ||
        usuario.dni.toLowerCase().includes(texto) ||
        usuario.email.toLowerCase().includes(texto)
    );
  }
  abrirModal(dni: string) {
    this.usuarioSeleccionadoDni = dni;
    console.log('DNI del usuario seleccionado:', this.usuarioSeleccionadoDni);
    this.mostrarmodal = true;
  }
  cerrarModal() {
    this.usuarioSeleccionadoDni = null;
    this.mostrarmodal = false;
  }
  @ViewChild('toast', { static: true })
  toast!: ToastComponent;

  eliminarUsuario(dni: string) {
    this.userService.deleteUser(dni).subscribe({
      next: (response) => {
        console.log(response);
        this.toast.show('Usuario eliminado correctamente', 'success', 4000);

        this.usuarios = this.usuarios.filter((usuario) => usuario.dni !== dni);
        this.cerrarModal();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Eliminación completada');
      },
    });
  }


// Paginación
page: number = 1;
itemsPorPagina: number = 6;

get totalPaginas(): number {
  return Math.ceil(this.usuariosFilter.length / this.itemsPorPagina);
}

get usuariosPaginados() {
  const inicio = (this.page - 1) * this.itemsPorPagina;
  const fin = inicio + this.itemsPorPagina;
  return this.usuariosFilter.slice(inicio, fin);
}

cambiarPagina(pagina: number) {
  if (pagina >= 1 && pagina <= this.totalPaginas) {
    this.page = pagina;
  }
}





}
