import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth:LoginService, private router: Router) { 
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
  ngOnInit() {
  }

}
