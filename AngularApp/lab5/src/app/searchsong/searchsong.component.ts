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

    });
  
  };
  reviewClick = function(): void{
    // loop through all the possible reviews.
  }
}
  
  
  