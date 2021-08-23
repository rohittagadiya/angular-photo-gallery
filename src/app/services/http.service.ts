import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURL: string = environment.baseURL;

  constructor(public http: HttpClient) { }

  getData(page_numer: number): Promise<any> {
    let httpOptions: any = {
      headers: {
        'Authorization': environment.pexelsAPIKey
      }
    };

    return this.http.get(this.baseURL + 'curated?per_page=30&page=' + page_numer, httpOptions).toPromise().then(result => {
    })

  }

  searchPhotos(query: string = "computer", page_numer: number) {
    let httpOptions: any = {
      headers: {
        'Authorization': environment.pexelsAPIKey
      }
    };

    return this.http.get(this.baseURL + '/search?query=' + query + '&per_page=30&page=' + page_numer, httpOptions).toPromise().then(result => {
      return result;
    })
  }
}
