import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationExtras } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import { ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-zones',
  template: `
  <div class="example-header">
    <mat-form-field>
      <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filter">
    </mat-form-field>
  </div>

  <div class="example-container mat-elevation-z8">

    <mat-table [dataSource]="dataSource" matSort>

      <!-- ID Column -->
      <ng-container matColumnDef="name">
        <mat-header-cell *matHeaderCellDef mat-sort-header> Indicator name </mat-header-cell>
        <mat-cell *matCellDef="let row"> {{row.NOM_INDICATEUR}} </mat-cell>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="option">
        <mat-header-cell *matHeaderCellDef mat-sort-header> Option </mat-header-cell>
        <mat-cell *matCellDef="let row">
          -- --
          <button (click)="goToIndicateur(row.CODE_INDICATEUR)" mat-icon-button>
            <mat-icon>sort</mat-icon>
          </button>
          -- more --
        </mat-cell>
      </ng-container>

      <!-- Color Column
      <ng-container matColumnDef="color">
        <mat-header-cell *matHeaderCellDef mat-sort-header> Color </mat-header-cell>
        <mat-cell *matCellDef="let row" [style.color]="row.color"> {{row.color}} </mat-cell>
      </ng-container>-->

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;">
      </mat-row>
    </mat-table>

    <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
  </div>
  `,
  styles: [`
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

export class IndicateurComponent {
  displayedColumns = ['name', 'option'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  idProj: string;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    const id = this.route.snapshot.paramMap.get('id');
    this.idProj = id;

    this.http.get<any[]>('http://localhost/api/getIndicateur.php?code=' + id)
    .subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  goToIndicateur(id) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'indi': id,
        'projet': this.idProj
      }
    };
    this.router.navigate(['dashboard/indi_collecte'], navigationExtras);
  }

}


