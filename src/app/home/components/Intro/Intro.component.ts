import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-intro',
  imports: [CommonModule,RouterModule,],
  templateUrl: './Intro.component.html',
  styleUrl: './Intro.component.css',
})
export class IntroComponent {}
