import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from '../../components/Intro/Intro.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, IntroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
