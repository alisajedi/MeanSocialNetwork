import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public error: string;
  constructor(private login: LoginService, private router: Router) { }
  public auth() {
    this.login.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['dashboard']),
        err => this.error = 'Could not authenticate'
      );
  }
  ngOnInit() {
  }

}
