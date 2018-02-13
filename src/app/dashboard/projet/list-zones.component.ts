import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { HttpClient } from '@angular/common/http';

interface ZONE {
  nom: string;
}

@Component({
  selector: 'app-zones',
  template:  `
  <div class="container">
  <table class="table table-striped table-hover">
    <thead>
    <tr>
      <th scope="col">Zone name</th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="let zone of zones">
      <th scope="row">{{zone.NOM_ZONE}}</th>
      <td><div class="gb">--- indicators</div></td>
      <td>
        <button (click)="goToIndicateurs()" mat-icon-button >
          <mat-icon>sort</mat-icon>
        </button>
      </td>
    </tr>
  </tbody>
</table>
</div>

  `,
  styles: [`
    .gb{
      text-align: end;
      font-size: 10px;
      color: rgb(155, 153, 153);
      font-family: fantasy;
    },
    .table{
      max-width: 1200px;
      min-width: 300px;
      width: inherit;
      font-family: "Times New Roman", Georgia, Serif;
    }
    button{
      outline: none;
    }
  `]
})

export class ListZonesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  zones: ZONE[];
  id: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.http.get<ZONE[]>('http://localhost/api/getZones.php?code=' + this.id)
    .subscribe(data => {this.zones = data; } );
  }

  goToIndicateurs() {
    this.router.navigate(['dashboard/indi_collecte', this.id]);
  }

}
