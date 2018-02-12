import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { MatIconModule, MatButtonModule } from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';

import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    MatMenuModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
