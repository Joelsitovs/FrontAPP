import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-usuarios-layout',
  imports: [CommonModule,SharedModule],
  templateUrl: './Usuarios-Layout.component.html',
  styleUrl: './Usuarios-Layout.component.css',
})
export class UsuariosLayoutComponent {
   sidebarExpandido: boolean = true;

  ngOnInit(): void {
    const guardado = localStorage.getItem('sidebarExpandido');
    this.sidebarExpandido = guardado === null ? true : guardado === 'true';
  }

  onSidebarToggle(expandido: boolean) {
    this.sidebarExpandido = expandido;
  }

}
