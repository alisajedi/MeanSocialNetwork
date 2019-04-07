import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
    let Url: string = 'http://localhost:3000/api/user/list';
    let queryUrl: string = '?search=';
    return this.http.get(Url + queryUrl + term)
        .map(res => {return res});
  }
  pokedUser(username: string) {
    let Url: string = 'http://localhost:3000/api/user/poke';
    return this.http.post(Url ,{username:username} )
        .map(res => {return res}
          
        );
  }
}
