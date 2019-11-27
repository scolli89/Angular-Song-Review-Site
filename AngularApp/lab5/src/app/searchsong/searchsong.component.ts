import { Component, OnInit } from '@angular/core';
  
import { HttpService } from '../http.service';
@Component({
  selector: 'app-searchsong',
  templateUrl: './searchsong.component.html',
  styleUrls: ['./searchsong.component.scss']
})
export class SearchsongComponent implements OnInit {

  constructor() { }

  soughtSongs: any = []; // song results of the search parameters

  ngOnInit() {
    let btn = document.getElementById("searchbtn");
    btn.addEventListener("click",this.submitClick);
    
  
  }
  
  submitClick = function(): void {
    //console.log("Submit clicked");
    //take the value from the text field
    let slt = document.getElementById("genreSelect");
    let ttl = document.getElementById("titleBar");
    let art = document.getElementById("artistBar");
    let alb = document.getElementById("albumBar");
    let yr = document.getElementById("Year");
    console.log("title: "+ttl.value+"\nartist: "+art.value+ "\nalbum: "+alb.value+"\nyear: "+yr.value);
    console.log(slt.value);
    // this._http.getAllSongs().subscribe(data =>{
    //   console.log("hi");
    //   this.topSongs = data;//json();
    // });
  };

  
  
  

}
