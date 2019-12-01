import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.get(this.openUrl +"/allsongs");
  }

  getTenSongs(){
    console.log("get ten");
    return this.http.get(this.openUrl +"/song")
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
    let u = this.secureUrl + "/login"
    let res;
    res =this.http.post(u,body);
     return res;
     

  }
  registerUser(_email,_pword){
    console.log("REgistering user");
    let body = {
      email: _email,
      password: _pword
    };
    
    let u = this.secureUrl + "/register";
    //console.log(u);
    let res;
    res = this.http.post(u,body);
    console.log(res);
    return res;
  }

  getCurrentUser(t,e,_id) {
    let body = {
      id: _id
    };
    // making and setting the access token header
    let headers = new HttpHeaders();
    console.log(t);
    headers = headers.set('Authorization',t);

    let u = this.secureUrl + "/current";
    console.log("getting");
    return this.http.post(u,body,{headers: headers});
  }

  makeSong(body,token){

    let headers = new HttpHeaders();
    headers = headers.set('Authorization',token);
    let u = this.secureUrl + "/song";
    console.log("making song");
    console.log(token)
    return this.http.post(u,body);//,{headers: headers});

  }

  makeReview(body,token){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',token);
    let u = this.secureUrl +"/review";
    console.log("making a review");
    return this.http.post(u,body);
  }
}
