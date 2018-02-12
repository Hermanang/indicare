import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToZones() {
    this.router.navigate(['dashboard/zones']);
  }
  goToIndicateurs() {
    this.router.navigate(['dashboard/indicateurs']);
  }

}



