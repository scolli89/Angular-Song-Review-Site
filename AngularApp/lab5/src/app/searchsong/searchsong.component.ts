import { Component, OnInit, AfterViewInit,ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
import { ActivatedRoute } from'@angular/router';
@Component({
  selector: 'app-searchsong',
  templateUrl: './searchsong.component.html',
  styleUrls: ['./searchsong.component.scss']
})
export class SearchsongComponent implements AfterViewInit{// implements OnInit {
  
  constructor(private http: HttpService, private route:ActivatedRoute) {
    console.log("constructor");
   }
  
  soughtSongs: any = []; // song results of the search parameters
  self;
  allReviews: any = [];
  matchReviews: any =[]; //reviews of the best matched song.
  h: any; 
  @ViewChild('rHead',{static: false}) reviewHead: ElementRef;
  ngAfterViewInit(){

  }
  ngOnInit() {
    
    this.http.getAllReviews().subscribe(
      response => {
        this.allReviews = response;
        console.log(this.allReviews);
        
      },
      function(error){},
      function(){
        console.log("got response");
        console.log(this.allReviews);
        this.h = document.getElementById("rHead");
      }
      )
    // btn.addEventListener("click", function(){ 
    //   let slt = document.getElementById("genreSelect") as HTMLInputElement;
    //   let ttl = document.getElementById("titleBar") as HTMLInputElement
    //   let art = document.getElementById("artistBar") as HTMLInputElement;
    //   let alb = document.getElementById("albumBar") as HTMLInputElement;
    //   let yr = document.getElementById("Year") as HTMLInputElement;
    //   console.log(slt.value + ttl.value + art.value + alb.value + yr.value);
    //   console.log(this);
    
    //   this.http.getSongSearch(ttl.value,art.value,alb.value,slt.value,yr.value).subscribe(data =>{
    //     this.soughtSongs = data;
    //       console.log(this.soughtSongs);
    //    });
    
    // });
    //this.submitClick);
   
    //this.httpsrv = this.http;
    //this.http = this.route.params.subscribe((u) => this.loadUser(u));
    //this.http = this.route.params.subscribe(this.loadUser.bind(this));
  }
  
  submitButtonClick = function(): void {
    // pull search parameters
    let slt = document.getElementById("genreSelect") as HTMLInputElement;
    let ttl = document.getElementById("titleBar") as HTMLInputElement
    let art = document.getElementById("artistBar") as HTMLInputElement;
    let alb = document.getElementById("albumBar") as HTMLInputElement;
    let yr = document.getElementById("Year") as HTMLInputElement;
    let rate = document.getElementById("rating") as HTMLInputElement;
    //send search request
    if(rate.value == ""){
      rate.value ="999";
    }
    this.http.getSongSearch(rate.value,ttl.value,art.value,alb.value,slt.value,yr.value).subscribe(
      data =>{
        this.soughtSongs = data;
        console.log(this.soughtSongs);
        rate.value ="";
        //turn on review
      });
  };

  reviewClick = function(): void{
    // loop through all the possible reviews.
    try{
    let lst = document.getElementById("li0");
    // call http function with the id getter.
    this.http.getReviewsOfSong(lst.title).subscribe(
      response => {
        // get the data
        this.matchReviews = response;
        console.log(this.matchReviews);
        // call the builder function after the data has been loaded.
        console.log(this.reviewHead);
        console.log(this.reviewHead.innerText);
        this.reviewHead.innerText = "Reviews for: "+this.soughtSongs[0].title;
   
        // throw them in
        let line = document.getElementById("reviewLine");
        for(var i = 0; i< this.matchReviews.length; i++){
          console.log(i);
          let l = document.createElement("li");
          let t0 = document.createTextNode(this.matchReviews[i].comment);
          let t1 = document.createTextNode("/ Rating: "+ this.matchReviews[i].rating);
          let t2 = document.createTextNode("/By: "+ this.matchReviews[i].submittedBy);
          let t3 = document.createTextNode("/On: "+ this.matchReviews[i].submittedOn);
          let l2 = document.createElement("li");
          l.appendChild(t0);
          l.appendChild(t1);
          l.appendChild(t2);
          l.appendChild(t3);
          line.appendChild(l);
        }
        
      },
      error => {
        console.log("uh oh");
      }
    );
  } catch(error){console.log(error)}
}
  reviewBuild = function(): void{
    try {

       // let h = document.getElementById("rHead");
        
    } catch( error){ console.log(error)}
  }
}
  
  
  