import { Component } from '@angular/core';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import { Router, NavigationExtras } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import { isNull } from 'util';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

export interface User {
  code_projet: number;
  code_utilisateur: string;
  niveau: number;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  user: User[];

  onSubmit() {
    /*const nom = this.emailFormControl.value;
    const pass = this.passwordFormControl.value;
    this.http.get<User[]>('http://localhost/api/loginUser.php?nom=' + nom + '&pass=' + pass)
    .subscribe(
      data => {
        if (isNull(data)) {
          console.log('Object null');
        } else {
          localStorage.setItem('curentUser', JSON.stringify(data));
        // this.router.navigate(['dashboard'], navigationExtras);
        }
      },
      error => {
        this.router.navigate(['notConnexion']);
      }
  );
    /*this.router.navigate(['dashboard']);*/
    /*console.log( 'Email: ' + JSON.stringify(this.emailFormControl.value)+" password : "+JSON.stringify(this.passwordFormControl.value));
    this.router.navigate(['dashboard']);*/
  }

  ngOnInit(): void {

  }

}
