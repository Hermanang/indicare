import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { MatIconModule, MatButtonModule } from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';

import {MatMenuModule} from '@angular/material/menu';

import { AsideComponent } from '../navigator/aside/aside.component';
import { SectionComponent } from '../navigator/section/section.component';

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
    DashboardComponent,
    AsideComponent,
    SectionComponent
  ]
})
export class DashboardModule { }
