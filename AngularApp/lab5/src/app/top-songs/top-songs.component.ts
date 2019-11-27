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
  reviews;
  //count : number =0;
  clickCounter: number = 0;
  infoClicked: boolean = false;
  constructor(private _http: HttpService) { }

  ngOnInit() {
    console.log("the init of top songs");
    // call all songs from the 
    this._http.getAllSongs().subscribe(data =>{
      this.topSongs = data;//json();
    });
    for(let reviewNum in this.topSongs){
      console.log("hi");
    }
    this._http.getAllReviews().subscribe(data =>{
      this.reviews = data;
    });


  }

  infoClick(){
    this.infoClicked = !(this.infoClicked);
  }
  

}
