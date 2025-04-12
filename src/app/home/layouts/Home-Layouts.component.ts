import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-home-layouts',
  imports: [CommonModule,SharedModule],
  templateUrl: './Home-Layouts.component.html',
  styleUrl: './Home-Layouts.component.css',
})
export class HomeLayoutsComponent {
  // sidebarExpandido: boolean = true;

  // ngOnInit(): void {
  //   const guardado = localStorage.getItem('sidebarExpandido');
  //   this.sidebarExpandido = guardado === null ? true : guardado === 'true';
  // }

  // onSidebarToggle(expandido: boolean) {
  //   this.sidebarExpandido = expandido;
  // }

}
