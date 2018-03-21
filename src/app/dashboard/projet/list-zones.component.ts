import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationExtras } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { HttpClient } from '@angular/common/http';

interface ZONE {
  nom: string;
}

@Component({
  selector: 'app-zones',
  template:  `
  <div class="container">
    <mat-selection-list #shoes>
      <mat-list-option *ngFor="let zone of zones" (click)="goToIndicateurs(zone.NOM_ZONE)">
        {{zone.NOM_ZONE}}
      </mat-list-option>
    </mat-selection-list>
</div>

  `,
  styles: [`
  mat-selection-list{
    width:1000px;
    min-width: 40px;
  }
  `]
})

export class ListZonesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  zones: ZONE[];
  id: any;
  ngOnInit(): void {
    // paramMap : parametre de la methode 'navigate(['nom', id])'
    this.id = this.route.snapshot.paramMap.get('id');

    this.http.get<ZONE[]>('http://localhost/api/getZones.php?code=' + this.id)
    .subscribe(data => {this.zones = data; } );
  }

  goToIndicateurs(nomZone) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'zone': nomZone,
        'code_p': this.id
      }
    };
    this.router.navigate(['dashboard/indi_collecte'], navigationExtras);
  }

}
