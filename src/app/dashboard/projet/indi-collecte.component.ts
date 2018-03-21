import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { HttpClient } from '@angular/common/http';
import { Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

import { ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


interface INDICATEUR {
  nom: string;
}

@Component({
  selector: 'app-zones',
  template:  `
  <div class="example-header">
  <mat-form-field>
    <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filter">
  </mat-form-field>
</div>

<div class="example-container mat-elevation-z8">

  <mat-table [dataSource]="dataSource" matSort>

    <!-- ID Column -->
    <ng-container matColumnDef="id">
      <mat-header-cell *matHeaderCellDef mat-sort-header> ID </mat-header-cell>
      <mat-cell *matCellDef="let row"> {{row.id}} </mat-cell>
    </ng-container>

    <!-- Progress Column -->
    <ng-container matColumnDef="progress">
      <mat-header-cell *matHeaderCellDef mat-sort-header> Progress </mat-header-cell>
      <mat-cell *matCellDef="let row"> {{row.progress}}% </mat-cell>
    </ng-container>

    <!-- Name Column -->
    <ng-container matColumnDef="name">
      <mat-header-cell *matHeaderCellDef mat-sort-header> Name </mat-header-cell>
      <mat-cell *matCellDef="let row"> {{row.name}} </mat-cell>
    </ng-container>

    <!-- Color Column -->
    <ng-container matColumnDef="color">
      <mat-header-cell *matHeaderCellDef mat-sort-header> Color </mat-header-cell>
      <mat-cell *matCellDef="let row" [style.color]="row.color"> {{row.color}} </mat-cell>
    </ng-container>

    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <mat-row *matRowDef="let row; columns: displayedColumns;">
    </mat-row>
  </mat-table>

  <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
</div>


  <p-growl [(value)]="msgs"></p-growl>

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

export class IndicateurCollecteComponent implements OnInit {
  displayedColumns = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute, private http: HttpClient, private messageService: MessageService) { 
    const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  // panelOpenState: boolean = false;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  indicateurs: INDICATEUR[];
  nom_zone: any;
  collecte = new FormControl('', [
    Validators.required
  ]);

  msgs: Message[] = [];
  ngOnInit(): void {
      // queryParams : parametre de la methode 'navigate(['nom'], navigationExtra ou queryParams)'
      this.nom_zone = this.route.snapshot.queryParams['zone'];
      const id = this.route.snapshot.queryParams['code_p'];

    this.http.get<INDICATEUR[]>('http://localhost/api/getIndicateur.php?code=' + id)
    .subscribe(data => {this.indicateurs = data; } );
  }

  submit(): void {
    this.collecte.reset();

    this.http.post('http://localhost/api/scanIndi.php',
    {
      valeur: 'valeur',
      code_projet: '2',
      code_indi: '2',
    })
    .subscribe(
      data => console.log(data),
      err => console.log(err)
    );

    this.showSuccess();
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

function createNewUser(id: number): UserData {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
