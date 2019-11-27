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
    console.log("the init of top songs");
    // call all songs from the 
    this._http.getAllSongs().subscribe(data =>{
      console.log("hi");
      this.topSongs = data;//json();
    });

    console.log(this.topSongs);

    this._http.getAllReviews().subscribe(data =>{
      this.reviews = data;
      console.log(this.reviews);
    });
    console.log("here");
    console.log(this.topSongs.length);
    console.log(this.topSongs);
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


  }

  

