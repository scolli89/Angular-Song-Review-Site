import { Component, OnInit, AfterViewInit, ElementRef,ViewChild } from '@angular/core';
import { HttpService } from '../http.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  
  clickCounter: number = 0;
  name: string = '';
  @ViewChild('loginLine',{static:false}) loginLine: ElementRef;
  @ViewChild('emailAddress',{static:false}) emailIn: ElementRef;
  @ViewChild('pword',{static:false}) pwIn: ElementRef;

  constructor(private http: HttpService) { }

  ngOnInit() {
  }
  ngAfterViewInit(){

  }

  countClick(){
    this.clickCounter += 1;
  }

  setClasses() {
    let myClasses = {
      active: this.clickCounter > 4,
      notactive: this.clickCounter <= 4
    };
    return myClasses;
  }

  makeLogin(e,p,s){
    console.log(e,p);
   
    if (e.style.display === "none") {
      e.style.display = "inline";
    } else {
      e.style.display = "none";
    }
    if (p.style.display === "none") {
      p.style.display = "inline";
    } else {
      p.style.display = "none";
    }
    

  }
  enterPE (e,p){
    console.log(e.value);
    console.log(p.value);
    if(e.value != "" && p.value != ""){
      console.log("sends")
      // now call the http service to log in .

    }


  }

  focusOutHandler(e){
    
    console.log(e.value);
  }



}
