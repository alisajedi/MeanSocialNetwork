import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [SearchService]
})
export class NavbarComponent implements OnInit {
  results: Object;
  searchTerm$ = new Subject<string>();
  public accessToken = localStorage.getItem('access_token');
  public headers:HttpHeaders = new HttpHeaders();
  user ={};

  constructor(private auth:LoginService, private router: Router,private searchService: SearchService,private http:HttpClient) { 
    this.headers = this.headers.append('Accept', 'application/json');
    this.headers = this.headers.append('x-access-token', this.accessToken);
    this.http.get(window.location.protocol + '//' + window.location.hostname + ':3000/' +'api/user',{headers: this.headers}).toPromise() .then(
      res => {
        localStorage.setItem('userInfo', JSON.stringify(res['user']));
        this.user = res['user'];
      }
    );

    this.searchService.search(this.searchTerm$)
    .subscribe(results => {
      this.results = results['users'];
    });
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
  pokeUser(username:string){
    this.searchService.pokedUser(username)
    .subscribe(results => {
      console.log(results);
      location.reload();
    });
  }
  ngOnInit() {
  }

}
