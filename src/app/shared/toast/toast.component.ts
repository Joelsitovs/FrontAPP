import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type ToastType = 'success' | 'error' | 'info';
@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  message: string = '';
  type: ToastType = 'success';
  visible: boolean = false;
  duration: number = 3000; // Default duration in milliseconds

  show(message: string, type: ToastType = 'success', duration: number = 3000) {
    this.message = message;
    this.type = type;
    this.visible = true;
    this.duration = duration;

    setTimeout(() => {
      this.visible = false;

      // Espera a que termine la animación de salida
      setTimeout(() => {
        this.message = '';
      }, 2500); // Debe coincidir con duración de la animación 'slide-out'
    }, this.duration);
  }
}
