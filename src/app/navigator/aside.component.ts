import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  template: `
  <div class="button-row">
  <button routerLink="projet" [routerLinkActive]="'active allume'" mat-button>
    <mat-icon>dialpad</mat-icon>
    <span>Projets</span>
</button>
</div>
<div class="button-row">
  <button routerLink="zones" [routerLinkActive]="'active allume'" mat-button >
    <mat-icon>voicemail</mat-icon>
    <span>Zones</span>
  </button>
</div>
<div class="button-row">
  <button routerLink="indicateurs" [routerLinkActive]="'active allume'" mat-button >
    <mat-icon>notifications_off</mat-icon>
    <span>Disable alerts</span>
  </button>
</div>
  `,
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
