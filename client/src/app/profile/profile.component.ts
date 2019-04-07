import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user ={};
  public accessToken = localStorage.getItem('access_token');;
  public headers:HttpHeaders = new HttpHeaders();
  editField: string;
  constructor(private http:HttpClient) {
    this.headers = this.headers.append('Accept', 'application/json');
    this.headers = this.headers.append('x-access-token', this.accessToken);
    this.http.get(window.location.protocol + '//' + window.location.hostname + ':3000/' +'api/user',{headers: this.headers}).toPromise() .then(
      res => {
        this.user = res['user'];
      }
    );
  }
  profileUpdate( ) {
    this.http.post(window.location.protocol + '//' + window.location.hostname + ':3000/' +'api/profile/update',{name:this.user['name']},{headers: this.headers}).toPromise() .then(
      res => {
        this.user = res['user'];
      }
    );
  }

  ngOnInit() {
  }

}
