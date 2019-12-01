import { Component, OnInit, AfterViewInit, ElementRef,ViewChild } from '@angular/core';
import { HttpService } from '../http.service';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  currentUser: {
    id: String,
    email: String,
    isAdmin: Boolean,
    isDeactivated: Boolean
  }
  errorMsg: number = 0;
  
  clickCounter: number = 0;
  name: string = '';
  aUser: any;
  @ViewChild('loginLine',{static:false}) loginLine: ElementRef;
  @ViewChild('emailAddress',{static:false}) emailIn: ElementRef;
  @ViewChild('pword',{static:false}) pwIn: ElementRef;
  @ViewChild('Error Line',{static:false}) errHead: ElementRef;
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

  makeLogin(e,p,l,r,lb,rb,lgn){
    
    //login button pushed
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
      if(lgn == true){ 
      l.style.display ="inline";
      r.style.display = "none";
      lb.style.display = "inline";
      rb.style.display = "none";
    } else if  (lgn == false){
      //dispplay the register header
      r.style.display ="inline";
      l.style.display = "none";
      lb.style.display = "none";
      rb.style.display = "inline";

    }
    
    

  }

  loginRegister(e,p,lgn){

    if (e.value.indexOf("@") == -1 ||e.value.indexOf(".") == -1 || e.value.length <= 5 ){ // email validation 
      console.log("invalid email");
      e.value = "";
      e.placeholder = "ENTER VALID EMAIL";
      return;
    } else {
      console.log ("Goode email");
    }
    // check value of the lgn variable. 
    // if 1, it will 
    // if 0, it will allow th euser to register 
    if (lgn){
      //logining in
      //allow the user to login.
      //make http call
      this.http.loginUser(e.value,p.value).subscribe(
        response=> {
          this.aUser = response;
          console.log(this.aUser);

        },
        error => {
          console.log(error.error.text);
          this.errorLineShow(error.error.text);
          
          },
        () => {
          console.log("ALWAYSHAPPENS");
        });

    } else{//registering
      console.log(e.value,p.value);
      //sending the registration request
      this.http.registerUser(e.value,p.value).subscribe(
        response => {
          this.aUser = response;
          //log in those who just registered
          console.log(response);
        },
        error => {
          console.log(error.error);
        }
      )
    }
   
  }

  errorLineShow(msg){
    if (msg == "Incorrect Email and Password"){
      this.errorMsg = 1;
    } else if(msg == "Your account has been deactivated. Contact admin at ---@admin.com"){
      this.errorMsg = 2;
    } else {
      this.errorMsg = 0;
    }
  }


}
