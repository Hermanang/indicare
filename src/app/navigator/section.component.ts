import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section',
  template: `<router-outlet></router-outlet>`
})
export class SectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
