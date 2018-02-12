import { Component } from '@angular/core';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import { Router, NavigationExtras } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import { isNull } from 'util';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { isNull } from 'util';
import { HttpClient } from '@angular/common/http';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

export interface User {
  code_projet: number;
  code_utilisateur: string;
  niveau: number;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  msgs: Message[] = [];
  constructor(private router: Router, private http: HttpClient, private messageService: MessageService) { }
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  user: User[];
  onSubmit() {
    const nom = this.emailFormControl.value;
    const pass = this.passwordFormControl.value;

    if (!this.passwordFormControl.hasError('required') && !this.passwordFormControl.hasError('required')) {
      this.http.get<User[]>('http://localhost/api/loginUser.php?nom=' + nom + '&pass=' + pass)
      .subscribe(
        data => {
          if (isNull(data)) {
            this.showError();
          } else {
            localStorage.setItem('curentUser', JSON.stringify(data));
            this.showSuccess();
          // this.router.navigate(['dashboard'], navigationExtras);
          }
        },
        error => {
          this.router.navigate(['notConnexion']);
        }
      );
    }
  }

  ngOnInit(): void {

  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Bienvenue ' + this.emailFormControl.value, detail: 'Order submitted'});
  }

  showError() {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Utilisateur inconnu', detail: 'Validation failed'});
}

}
