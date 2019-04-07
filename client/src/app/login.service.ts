    
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    if(!this.loggedIn)
    {
        return this.http.post(window.location.protocol + '//' + window.location.hostname + ':3000/' +'api/auth', {username: username, password: password})
        .pipe(
          map(result => {
            localStorage.setItem('access_token', result['accessToken']);
            return true;
          })
        );
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userInfo');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}