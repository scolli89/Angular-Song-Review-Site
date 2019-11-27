import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-searchsong',
  templateUrl: './searchsong.component.html',
  styleUrls: ['./searchsong.component.scss']
})
export class SearchsongComponent implements OnInit {
  
  constructor(private http: HttpService) {
    console.log("constructor");
   }
  
  httpsrv;
  soughtSongs: any = []; // song results of the search parameters

  ngOnChanges(){
    console.log("change");
  }
  ngOnInit() {
    let btn = document.getElementById("searchbtn");
    btn.addEventListener("click",this.submitClick);
    //this.httpsrv = this.http;
  }
  
  submitClick = function(): void {
    //console.log("Submit clicked");
    //take the value from the text field
    let slt = document.getElementById("genreSelect").value;
    let ttl = document.getElementById("titleBar").value;
    let art = document.getElementById("artistBar").value;
    let alb = document.getElementById("albumBar").value;
    let yr = document.getElementById("Year").value;

    // this.httpsrv.getSongSearch(ttl,art,alb,slt,yr).subscribe(data =>{
    //   this.soughtSongs = data;
    //   console.log(this.soughtSongs);
    // });
   
    // this._http.getAllSongs().subscribe(data =>{
    //   console.log("hi");
    //   this.topSongs = data;//json();
    // });
  };

}
  
  
  