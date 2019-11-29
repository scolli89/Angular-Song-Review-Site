import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
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
  infoClicked: boolean = false;
  constructor(private _http: HttpService) { }

  ngOnInit() {
    let songs;
    let revs;
    let d = document.getElementById("rt");
    let s = document.createElement("select");
    s.id = "hi";
    let o = document.createElement("option");
    o.value = "8";
    o.innerText =" hi";
    s.appendChild(o);
    d.appendChild(s);
    // call all songs from the 
    this._http.getAllSongs().subscribe(data =>{
      this.topSongs = data;//json();
      //console.log(this.topSongs);
      songs = this.topSongs;
      
      



    });
    for(var i = 0; i < songs.length;i++){
      console.log(i);
      let p = document.getElementById("slt");
      let s = document.createElement("option");
      s.value = songs[i].id;
      s.innerText = songs[i].title;
      p.appendChild(s);
    }
    

    this._http.getAllReviews().subscribe(data =>{
      this.reviews = data;
      console.log(this.reviews);
    });
    //console.log("here");
    //console.log(this.topSongs.length);
    //console.log(this.topSongs);
    for(var i = 0; i< this.topSongs.length;i++){
      console.log(i);
      console.log(this.topSongs[i].id);
    }


      //this.recentReviews.push();


  }

  infoClick(){
      this.infoClicked = !(this.infoClicked);
      //set the most recient review for a song. 
  
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

  

