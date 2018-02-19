import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { HttpClient } from '@angular/common/http';
import { Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';


interface INDICATEUR {
  nom: string;
}

@Component({
  selector: 'app-zones',
  template:  `
  <mat-card class="example-card">
  <mat-card-header>
    <mat-card-title>-- ZONE --</mat-card-title>
    <mat-card-subtitle>{{nom_zone}}</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>

  <mat-accordion>
  <mat-expansion-panel *ngFor="let indicateur of indicateurs">
    <mat-expansion-panel-header>
      <mat-panel-title>
      {{indicateur.NOM_INDICATEUR}}
      </mat-panel-title>
    </mat-expansion-panel-header>

    <mat-form-field>
    <input matInput [formControl]="collecte" placeholder="Renseigner indicateur" type="number" class="example-right-align">
    <span matPrefix>#</span>
    </mat-form-field>

    <button (click)="submit()" mat-raised-button color="warn">
      <mat-icon>done</mat-icon>
    </button>

  </mat-expansion-panel>
  </mat-accordion>

  </mat-card-content>
</mat-card>

<p-growl [(value)]="msgs"></p-growl>

  `,
  styles: [`
  input.example-right-align::-webkit-outer-spin-button,
  input.example-right-align::-webkit-inner-spin-button {
    display: none;
  }

  input.example-right-align {
    -moz-appearance: textfield;
  }
  button{
    margin-left: 30px;
    width: 25px;
  }
  `]
})

export class IndicateurCollecteComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private messageService: MessageService) { }
  // panelOpenState: boolean = false;

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

    this.http.post('http://localhost/api/scanIndi.php', {})
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
