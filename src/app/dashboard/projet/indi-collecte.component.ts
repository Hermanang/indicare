import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { HttpClient } from '@angular/common/http';
import { Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

import { ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { skipUntil } from 'rxjs/operators';
import { range } from 'rxjs/observable/range';

@Component({
  selector: 'app-collecte',
  template:  `
<mat-card>
<mat-card-content>
  <h2 class="example-h2">Collecte d'indicateurs</h2>
  <mat-tab-group class="demo-tab-group">
    <mat-tab label="Tab 1">
      <ng-template mat-tab-label>
        <mat-icon>security</mat-icon>
      </ng-template>
      <div class="demo-tab-content">
      <div class="example-header">
      <mat-form-field>
        <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filter">
      </mat-form-field>
    </div>

    <div class="example-container mat-elevation-z8">

      <mat-table [dataSource]="dataSource" matSort>

        <!-- ID Column -->
        <ng-container matColumnDef="nom">
          <mat-header-cell *matHeaderCellDef mat-sort-header> {{indicator}} </mat-header-cell>
          <mat-cell *matCellDef="let row"> {{row.NUMERATEUR}} </mat-cell>
        </ng-container>

        <!-- Progress Column -->
        <ng-container matColumnDef="date_collecte">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Date collecte </mat-header-cell>
          <mat-cell *matCellDef="let row"> {{row.DATE_COLLECTE}} </mat-cell>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="periode">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Période </mat-header-cell>
          <mat-cell *matCellDef="let row"> {{row.PERIODE}} </mat-cell>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="etat">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Etat </mat-header-cell>
          <mat-cell *matCellDef="let row">
          <div *ngIf="row.ETAT==1">validé</div>
          <div *ngIf="row.ETAT==0">non valié</div>
          </mat-cell>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="zone">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Zone </mat-header-cell>
          <mat-cell *matCellDef="let row"> tambard </mat-cell>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="agent_collecte">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Agent collecte </mat-header-cell>
          <mat-cell *matCellDef="let row"> {{row.AGENT}} </mat-cell>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="option">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Option </mat-header-cell>
          <mat-cell *matCellDef="let row"> {{row.name}} </mat-cell>
        </ng-container>

        <!-- Color Column
        <ng-container matColumnDef="Option">
          <mat-header-cell *matHeaderCellDef mat-sort-header> Color </mat-header-cell>
          <mat-cell *matCellDef="let row" [style.color]="row.color"> {{row.color}} </mat-cell>
        </ng-container> -->

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;">
        </mat-row>
      </mat-table>

      <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
    </div>
      </div>
    </mat-tab>
    <mat-tab label="Tab 2">
      <ng-template mat-tab-label>
        <mat-icon>attach_file</mat-icon>
      </ng-template>
      <div class="demo-tab-content">
      <p-growl [value]="msgs"></p-growl>

      <p-chart type="line" [data]="datas" (onDataSelect)="selectData($event)"></p-chart>
      </div>
    </mat-tab>
    <mat-tab label="Tab 2">
      <ng-template mat-tab-label>
        <mat-icon>attach_file</mat-icon>
      </ng-template>
      <div class="demo-tab-content">
      <p-growl [value]="msgs"></p-growl>

      <p-chart type="line" [data]="data" (onDataSelect)="selectData($event)"></p-chart>
      </div>
    </mat-tab>
  </mat-tab-group>
</mat-card-content>
</mat-card>
  `,
  styles: [`
  mat-card{
    width: 1000px;
  }
  demo-tab-group {
    border: 1px solid #e8e8e8;
  }
  .demo-tab-content {
    padding: 16px;
  }
  .example-container {
    display: flex;
    flex-direction: column;
    min-width: 300px;
    width: 1000px;
  }

  .example-header {
    min-height: 64px;
    padding: 8px 24px 0;
  }

  .mat-form-field {
    font-size: 14px;
    width: 100%;
  }

  .mat-table {
    overflow: auto;
    max-height: 500px;
  }

  `]
})

export class IndicateurCollecteComponent implements OnInit {
  displayedColumns = ['nom', 'date_collecte', 'periode', 'etat', 'zone', 'agent_collecte', 'option'];
  dataSource: MatTableDataSource<any>;
  indicator: any;

  datas: any;
  data: any;
  msgs: Message[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  example: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private messageService: MessageService) {
    const idProj = this.route.snapshot.queryParams['projet'];
    // tslint:disable-next-line:comment-format
    //paramsMap (pour les navigate(['lien', code]))
    const idInd = this.route.snapshot.queryParams['indi'];
    this.http.get<any[]>('http://localhost/api/getCollecte.php?code_projet=' + idProj + '&code_ind=' + idInd)
    .subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.indicator = data[0][0];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

         let i = 1, somme = 0, somme_deno = 0, j = 0;
         const table = [];
         const trim = [];
         const deno = [];
         data.map(({NUMERATEUR, DENOMINATEUR}) => {
          if ( i <= 3 ) {
            somme = somme + Number(NUMERATEUR);
            somme_deno = somme_deno + Number(DENOMINATEUR);
          }
          if ( i === 3) {
            table[j] = somme;
            deno [j] = somme_deno;
            trim [j] = 'Trim ' + (j + 1);
            j++;
            somme = 0;
            somme_deno = 0;
            i = 0;
          }
          i++;
         });

        const options = {year: 'numeric', month: 'long'};
        this.datas = {
          labels: data.map(({DATE_COLLECTE}) => new Date(DATE_COLLECTE).toLocaleString('en-US', options)),
          datasets: [
              {
                  label: 'Colllecte',
                  data: data.map(({NUMERATEUR}) => NUMERATEUR),
                  fill: true,
                  borderColor: '#4bc0c0'
              },
              {
                  label: 'Objectif',
                  data: data.map(({DENOMINATEUR}) => DENOMINATEUR),
                  fill: false,
                  borderColor: '#565656'
              }
          ]
      };

      this.data = {
        labels: trim,
        datasets: [
            {
                label: 'Colllecte',
                data: table,
                fill: true,
                borderColor: '#4bc0c0'
            },
            {
                label: 'Objectif',
                data: deno,
                fill: false,
                borderColor: '#565656'
            }
        ]
    };
      } );

  }
  /*ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }*/

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectData(event) {
    this.msgs = [];
    // tslint:disable-next-line:max-line-length
    this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.datas.datasets[event.element._datasetIndex].data[event.element._index]});
  }

  // tslint:disable-next-line:member-ordering
  ngOnInit(): void {
      // queryParams : parametre de la methode 'navigate(['nom'], navigationExtra ou queryParams)'
      /*this.nom_zone = this.route.snapshot.queryParams['zone'];
      const id = this.route.snapshot.queryParams['code_p'];

    this.http.get<INDICATEUR[]>('http://localhost/api/getIndicateur.php?code=' + id)
    .subscribe(data => {this.indicateurs = data; } );*/
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Success', detail: 'Order submitted'});
  }

  showError() {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Erreur', detail: 'Validation failed'});
  }
}
