import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchsong',
  templateUrl: './searchsong.component.html',
  styleUrls: ['./searchsong.component.scss']
})
export class SearchsongComponent implements OnInit {

  constructor() { }

  

  


  ngOnInit() {
    let btn = document.getElementById("searchbtn");
    btn.addEventListener("click",this.submitClick);
  
  
  }
  
  submitClick = function(): void {
    console.log("Submit clicked");
  };

}
