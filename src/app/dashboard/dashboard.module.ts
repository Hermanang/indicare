import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { MatIconModule, MatButtonModule } from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';

import {MatMenuModule} from '@angular/material/menu';

import { AsideComponent } from '../navigator/aside.component';
import { SectionComponent } from '../navigator/section.component';

import { ProjetTitleComponent } from './projet/projet-title.component';
import { ProjetComponent } from './projet/projet.component';
import { ListZonesComponent } from './projet/list-zones.component';
import { IndicateurComponent } from './projet/indicateur.component';
import { IndicateurCollecteComponent } from './projet/indi-collecte.component';

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
    SectionComponent,
    ProjetTitleComponent,
    ProjetComponent,
    IndicateurComponent,
    ListZonesComponent,
    IndicateurCollecteComponent
  ]
})
export class DashboardModule { }
