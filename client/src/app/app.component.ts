import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  constructor(private login: LoginService, private router: Router) { 
    if (this.login.loggedIn) {
      router.navigate(['dashboard']);
    }
  }
  logout() {
    this.login.logout();
    this.router.navigate(['login']);
  }
}
