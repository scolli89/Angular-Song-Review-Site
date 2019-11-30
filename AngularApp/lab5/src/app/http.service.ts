import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';





@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  //baseUrl
  openUrl: string = 'http://localhost:8080/api/open';
  secureUrl: string = 'http://localhost:8080/api/secure';
  adminUrl: string = 'http://localhost:8080/api/admin';

  url: string = '/songs/open/song';
  searchUrl: string = '/songs/open/search';
  reviewUrl: string = '/review/open/reviews';


  getbeer() {
    return this.http.get('https://api.openbrewerydb.org/breweries');
  }
  
  myMethod(){
    return console.log("hi");
  }

  getAllSongs(){
    console.log("inrequest");
    return this.http.get(this.openUrl +"/song");
  }

  getAllReviews(){
    console.log('in get all reviews');
    return this.http.get( this.openUrl + '/reviews');
  }

  getReviewsOfSong(sid){
    console.log(sid);
    console.log("All reviews for: "+ sid);
    let body = {
      _id: sid
    };
    let u = this.openUrl +'/reviews';
    return this.http.post(u,body);
  }
  getSongSearch(rate,ttl,art,alb,grn,yr){
    //console.log(rate+ ttl + art+ alb + ""+grn+"" + yr);
    console.log("Searching for songs");
    let body = {
      title: ttl,
      artist: art,
      album: alb,
      genre: grn,
      year: yr,
      avgRating: rate
    };
    console.log(body);
    let u = this.openUrl + '/song';
    return this.http.post(u,body);
  }
  loginUser(_email,_pword){
    console.log("Sending Authentication")
    let body = {
      email: _email,
      password: _pword
    } ;
    let u = this.secureUrl + "/secure/login"
    return this.http.post(u,body);

  }
  registerUser(_email,_pword){
    console.log("REgistering user");
    let body = {
      email: _email,
      password: _pword
    };
    
    let u = this.secureUrl + "/register";
    console.log(u);
    return this.http.post(u,body);
  }

}

