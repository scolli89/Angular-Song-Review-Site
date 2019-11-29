import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';





@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  //baseUrl
  openUrl: string = 'http://localhost:8080/api/open';
  secureUrl: string = 'http://localhost:8080/secure';
  adminUrl: string = 'http://localhost:8080/admin';

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
  

}

