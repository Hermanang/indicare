import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Projet {
   nom: string;
}

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  projets: any;

  ngOnInit() {
    this.projets = JSON.parse(localStorage.getItem('curentUser'));
  }
  goToZones(id) {
    this.router.navigate(['dashboard/zones', id]);
  }
  goToIndicateurs() {
    this.router.navigate(['dashboard/indicateurs']);
  }

}



