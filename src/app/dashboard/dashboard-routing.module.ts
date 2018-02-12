import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
