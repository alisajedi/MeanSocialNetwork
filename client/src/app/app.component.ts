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
  public loggedIn:Boolean = false;

  constructor(private auth: LoginService, private router: Router) { 
    this.loggedIn= this.auth.loggedIn;
    if (this.loggedIn) {
      router.navigate(['dashboard']);
    }
  }
  ngOnInit() {
  }
}
