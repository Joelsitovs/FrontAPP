import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-lateral',
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-lateral.component.html',
  styleUrl: './nav-lateral.component.css',
})
export class NavLateralComponent {
  @Input() sidebarExpandido: boolean = true;
  @Output() sidebarToggle = new EventEmitter<boolean>();

  
  toggleSidebar() {
    this.sidebarExpandido = !this.sidebarExpandido;
    this.sidebarToggle.emit(this.sidebarExpandido);
    localStorage.setItem('sidebarExpandido', String(this.sidebarExpandido));
  }
}
