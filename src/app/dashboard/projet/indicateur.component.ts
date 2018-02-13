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
      <th scope="col">Définition</th>
      <th scope="col">Méth Cal Num</th>
      <th scope="col">Méth Cal Den</th>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="let indicateur of indicateurs">
      <th scope="row">{{indicateur.NOM_INDICATEUR}}</th>
      <th scope="row">{{indicateur.DEF_INDICATEUR}}</th>
      <th scope="row">{{indicateur.METH_CAL_NUM}}</th>
      <th scope="row">{{indicateur.METH_CAL_DEN}}</th>
    </tr>
  </tbody>
</table>
</div>

  `
})

export class IndicateurComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  indicateurs: INDICATEUR[];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.http.get<INDICATEUR[]>('http://localhost/api/getIndicateur.php?code=' + id)
    .subscribe(data => {this.indicateurs = data; } );
  }

}
