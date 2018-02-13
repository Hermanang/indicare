import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

import { ProjetTitleComponent } from './projet/projet-title.component';
import { ProjetComponent } from './projet/projet.component';
import { ListZonesComponent } from './projet/list-zones.component';
import { IndicateurComponent } from './projet/indicateur.component';
import { IndicateurCollecteComponent } from './projet/indi-collecte.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: ProjetTitleComponent
      },
      {
        path: 'projet',
        component: ProjetComponent
      },
      {
        path: 'zones/:id',
        component: ListZonesComponent
      },
      {
        path: 'indicateurs/:id',
        component: IndicateurComponent
      },
      {
        path: 'indi_collecte/:id',
        component: IndicateurCollecteComponent
      }
    ]
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
