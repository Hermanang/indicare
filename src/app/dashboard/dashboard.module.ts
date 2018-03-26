import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { MatIconModule, MatButtonModule, MatFormFieldModule, MatCardModule } from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';

import {MatMenuModule} from '@angular/material/menu';

import { AsideComponent } from '../navigator/aside.component';
import { SectionComponent } from '../navigator/section.component';

import { ProjetTitleComponent } from './projet/projet-title.component';
import { ProjetComponent } from './projet/projet.component';
import { ListZonesComponent } from './projet/list-zones.component';
import { IndicateurComponent } from './projet/indicateur.component';
import { IndicateurCollecteComponent } from './projet/indi-collecte.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material';

import {MatExpansionModule} from '@angular/material/expansion';
import {GrowlModule} from 'primeng/growl';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';
import {ChartModule} from 'primeng/chart';
import {MatTabsModule} from '@angular/material/tabs';
import { EtatAnnuelCollecteComponent } from './projet/etat-annuel.component';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ExcelExportModule  } from '@progress/kendo-angular-excel-export';
import { GridModule, ExcelModule  } from '@progress/kendo-angular-grid';


@NgModule({
  imports: [
    MatMenuModule,
    MatTabsModule,
    ChartModule,
    MatListModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule,
    GrowlModule,
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatTooltipModule,
    ExcelModule,
    DashboardRoutingModule,
    ButtonsModule,
    ExcelExportModule,
    GridModule
  ],
  declarations: [
    DashboardComponent,
    AsideComponent,
    SectionComponent,
    ProjetTitleComponent,
    ProjetComponent,
    IndicateurComponent,
    ListZonesComponent,
    IndicateurCollecteComponent,
    EtatAnnuelCollecteComponent
  ]
})
export class DashboardModule { }
