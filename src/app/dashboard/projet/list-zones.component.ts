import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/switchMap';
import { HttpClient } from '@angular/common/http';

interface ZONE {
  nom: string;
}

@Component({
  selector: 'app-zones',
  template:  `
  <div class="container">
  <table class="table table-hover table-dark">
    <thead>
    <tr>
      <th scope="col">Project name</th>
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

  `
})

export class ListZonesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  zones: ZONE[];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.http.get<ZONE[]>('http://localhost/api/getZones.php?code=' + id)
    .subscribe(data => {this.zones = data; } );
  }

}
