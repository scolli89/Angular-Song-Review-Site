import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
import { ActivatedRoute } from'@angular/router';
@Component({
  selector: 'app-searchsong',
  templateUrl: './searchsong.component.html',
  styleUrls: ['./searchsong.component.scss']
})
export class SearchsongComponent implements OnInit {
  
  constructor(private http: HttpService, private route:ActivatedRoute) {
    console.log("constructor");
   }
  
  soughtSongs: any = []; // song results of the search parameters
  self;
  ngOnChanges(){
    console.log("change");
  }
  ngOnInit() {
    console.log(this);
    let hd = document.getElementById("resultsHead");
    hd.innerHTML = "";
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
    //console.log("Submit clicked");
    //take the value from the text field
    //let line = document.getElementById("resultLine");
    //console.log(line);
    //console.log(document);
    //line.id = "resultLine";
    let slt = document.getElementById("genreSelect") as HTMLInputElement;
    let ttl = document.getElementById("titleBar") as HTMLInputElement
    let art = document.getElementById("artistBar") as HTMLInputElement;
    let alb = document.getElementById("albumBar") as HTMLInputElement;
    let yr = document.getElementById("Year") as HTMLInputElement;
    let rate = document.getElementById("rating") as HTMLInputElement;
    
    console.log(slt.value + ttl.value + art.value + alb.value + yr.value);
    console.log(this);
    
    this.http.getSongSearch(rate.value,ttl.value,art.value,alb.value,slt.value,yr.value).subscribe(data =>{
      this.soughtSongs = data;

      console.log(this.soughtSongs);
      //disaplying these guys now.
      
      // line.innerHTML = "Search Results";
      // let lst = document.getElementById("resultList");
      // for(var i = 0; i< this.soughtSongs; i++){
      //   // loop through the results. make sure it is not null
      //   if(this.soughtSongs != null){
      //     // add any item to the 
      //     let t0 = document.createTextNode("Title: " +this.soughtSongs[i].title);
      //     let t1 = document.createTextNode("\nArtist: "+ this.soughtSongs[i].artist);
      //     let t2 = document.createTextNode("\nAlbum: "+this.soughtSongs[i].album);
      //     let t3 = document.createTextNode("\nGenre: "+ this.soughtSongs[i].genre);
      //     let t4 = document.createTextNode("\nAvg Rating: "+ this.soughtSongs[i].avgRating);
      //     let p = document.createElement("P");
      //     p.appendChild(t0);
      //     p.appendChild(t1);
      //     p.appendChild(t2);
      //     p.appendChild(t3);
      //     p.appendChild(t4);
      //     lst.appendChild(p);
      //   }

      // }



    });
   
    // this._http.getAllSongs().subscribe(data =>{
    //   console.log("hi");
    //   this.topSongs = data;//json();
    // });
  };
  reviewClick = function(): void{
    // loop through all the possible reviews.
  }
}
  
  
  