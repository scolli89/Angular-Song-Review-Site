import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import * as myGlobals from '../globals';
@Component({
  selector: 'app-top-songs',
  templateUrl: './top-songs.component.html',
  styleUrls: ['./top-songs.component.scss']
})
export class TopSongsComponent implements OnInit {

  songs; //bject;//any = [];
  //songs: Object;
  topSongs: any = [];
  reviews:any = [];

  recentReviews: any = [];
  //count : number =0;
  clickCounter: number = 0;
  infoClicked: number = 0;
  constructor(private _http: HttpService) { }

  ngOnInit() {
    console.log(myGlobals.bob);
    //let songs;
    // call all songs from the 
    this._http.getTenSongs().subscribe(data =>{
      this.topSongs = data;//json();
      //console.log(this.topSongs);
      this.songs = this.topSongs;
      console.log(this.songs);
    },
    function(error){console.log("ghjgjhgj")},
    function(){
      console.log(this.songs);
      console.log("the Subscription is completed");
    
    
    });
    this._http.getAllReviews().subscribe(data =>{
      this.reviews = data;
      console.log(this.songs);
      console.log(this.reviews);
    });
    //console.log("here");
    //console.log(this.topSongs.length);
    //console.log(this.topSongs);
    


      //this.recentReviews.push();


  }

  infoClick(){
      
      //this.infoClicked = !(this.infoClicked);
      //set the most recient review for a song. 
    if(this.infoClicked ==0){
      
      let s = this.topSongs;
      let r = this.reviews;
      console.log(this.topSongs);
      console.log(this.reviews);
      // loop through all topSongs.
      for(var i = 0; i<this.reviews.length; i++){
       // console.log(s[i]._id);
       console.log(r[i].comment);
      }
      let x = "btn"+s[0]._id;
     // let b = document.getElementById("btn"+s._id) as HTMLButtonElement;
     // console.log(x)
      //.log(b.innerHTML);
      let c = document.getElementsByClassName("info button");
      
     
      for (var i = 0 ; i < c.length; i++){
        for(var j = 0; j < r.length; j++){
          
          if (c[i].id.slice(3,c[i].id.length) == r[j].songId){
          //  let ts = document.createTextNode()
          console.log(i +":"+j+ ": " +c[i].id.slice(2,c[i].id.length) ==  r[j].songId );
     
         
            let t0 = document.createTextNode("Recent Review: " + r[j].comment);
            let t1 = document.createTextNode("\nRating: "+ r[j].rating);
            let t2 = document.createTextNode("\nReviewer: "+r[j].submittedBy);
            let p = document.createElement("P");

            p.appendChild(t0);
            p.appendChild(t1);
            p.appendChild(t2);
            c[i].appendChild(p);
          }
          
        }
      }
      //see if a review matches it.
      //add it to the 
      //btn5ddd965744d3c82a381d2f61
    }
      this.infoClicked++;
  } 
  reviewBtnClick = function(): void {
      //console.log("Submit clicked");
      //take the value from the text field
      //let line = document.getElementById("resultLine");
      //console.log(line);
      //console.log(document);
      //line.id = "resultLine";
      let slt = document.getElementById("reviewSlt") as HTMLInputElement;
      let s = slt.value;    
      let f = document.getElementById("hi")as HTMLInputElement;

      console.log(f.value);
      this._http.getReviews(s).subscribe(data =>{
        this.soughtSongs = data;
        console.log(this.soughtSongs);
      });
  };

  }

  

