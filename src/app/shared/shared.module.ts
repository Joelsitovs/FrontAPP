import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './toast/toast.component';
import { NavLateralComponent } from './navigation/nav-lateral/nav-lateral.component';
import { NavTopComponent } from './navigation/nav-top/nav-top.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ToastComponent, NavLateralComponent,NavTopComponent],
  exports: [RouterModule, ToastComponent, NavLateralComponent,NavTopComponent],
})
export class SharedModule {}
