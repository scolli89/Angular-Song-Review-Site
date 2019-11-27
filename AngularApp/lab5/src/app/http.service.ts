import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  //baseUrl
  baseUrl: string = 'http://localhost:8080/api';
  //secure
  openUrl: string = '/songs/open/song/';

  getbeer() {
    return this.http.get('https://api.openbrewerydb.org/breweries');
  }
  
  myMethod(){
    return console.log("hi");
  }

  getAllSongs(){
    console.log("inrequest");
    return this.http.get(this.baseUrl + this.openUrl);
  }

  getAllReviews(){
    console.log('in get all reviews');
    return this.http.get(this.baseUrl)
  }
  

}
