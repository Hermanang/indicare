import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { HttpClient } from '@angular/common/http';

interface INDICATEUR {
  nom: string;
}

@Component({
  selector: 'app-zones',
  template:  `
  <div class="container">
  <table class="table table-striped table-hover">
    <thead>
    <tr>
      <th scope="col">Indicateur name</th>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="let indicateur of indicateurs">
      <td scope="row">{{indicateur.NOM_INDICATEUR}}</td>
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

export class IndicateurCollecteComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  indicateurs: INDICATEUR[];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.http.get<INDICATEUR[]>('http://localhost/api/getIndicateur.php?code=' + id)
    .subscribe(data => {this.indicateurs = data; } );
  }

}
