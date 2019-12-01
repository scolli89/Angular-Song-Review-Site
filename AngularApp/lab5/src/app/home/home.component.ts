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
  theToken: any;
  clickCounter: number = 0;
  name: string = '';
  aUser: any;
  userActive: boolean = false;
  songMaker: boolean = false;
  reviewMaker: boolean = false;
  allSongs: any =[];

  @ViewChild('loginLine',{static:false}) loginLine: ElementRef;
  @ViewChild('emailAddress',{static:false}) emailIn: ElementRef;
  @ViewChild('pword',{static:false}) pwIn: ElementRef;
  @ViewChild('Error Line',{static:false}) errHead: ElementRef;
  constructor(private http: HttpService) { }

  ngOnInit() {
    //get all the songs to fill the select box
    console.log("on init");
    this.http.getAllSongs().subscribe(data => {
      this.allSongs = data;
      console.log(this.allSongs);
      
    })


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
    } 
    // check value of the lgn variable. 
    // if 1, it will 
    // if 0, it will allow th euser to register 
    if (lgn){
      //logining in
      //allow the user to login.
      //make http call
      this.http.loginUser(e.value,p.value).subscribe(
        (response)=> {
          console.log(response.t);
          console.log(response.header);
          this.aUser = {
            email:response.email,
            _id: response._id,
            isAdmin: response.isAdmin,
            isDeactivated:response.isDeactivated
          } ;
          this.theToken = response.t;
          this.userActive = true;
          console.log(this.aUser);
         // console.log(response.header.get('x-access-token'));
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
  createSong(){
    console.log("create Song");
    //making the text areas visible. 
    if(this.songMaker) {
      this.songMaker = false;
      return;
    }
    this.songMaker = true;
    if(this.reviewMaker) this.reviewMaker = false;


    this.http.getCurrentUser(this.theToken,this.aUser.email,this.aUser._id).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }
  createReview(){
    console.log("create reivew");
    
    if(this.reviewMaker) {
      this.reviewMaker = false;
      return;
    }
    this.reviewMaker = true;
    if(this.songMaker) this.songMaker = false;
  }

  errorLineShow(msg){
    if (msg == "Incorrect Email and Password"){
      this.errorMsg = 1;
    } else if(msg == "Your account has been deactivated. Contact admin at ---@admin.com"){
      this.errorMsg = 2;
    } else if(msg == "Invalid Song"){
      this.errorMsg = 3;
    } else if(msg == "Invalid Rating"){
      this.errorMsg = 4;
    } else if(msg == "no Title"){
      this.errorMsg = 5;
    } else if(msg == "no artist"){
      this.errorMsg = 6;
    }
    
    else {
      this.errorMsg = 0;
    }
  }
  getUser(){
    console.log(this.aUser.email);
  }
 
  makeNewSong(ttl,art,alb,gr,yr,trck,cmm){

    console.log("IN MAKE NEW SONG()");
    let _title = ttl.value;
    let _artist = art.value;
    let _album = alb.value;
    let _year = yr.value;
    let _commet = cmm.value;
    let _track = trck.value;
    let _genre = gr.value;
    let _zb = 1;
    if (_title == ""){
      ttl.innerHtml = "REQUIRED FIELD";
      this.errorLineShow("no Title");
      return;
    } 
    if (_artist == ""){
      art.innerHtml = "REQUIRE FIELD";
      this.errorLineShow("no artist");
      return;
    }
    if(_track != 0){
      _zb = 0;
    }
    let body ={
      title: _title,
      artist: _artist,
      album: _album,
      year:_year,
      commet:_commet,
      track: _track,
      genre: _genre,
      zb: _zb,
      submittedBy: this.aUser.email
    };
    console.log("body: ", body);
    if (this.theToken == null) return "ERROR no token";
    return this.http.makeSong(body,this.theToken).subscribe(
      response => {
        console.log(response);

      },
      error =>{
        console.log(error);
      }
    );






  }

  makeNewReview(song,rate,rev){
    //check if song exists.
    console.log("Make new review");
    let sId = "none"
    let iFound = -1;
    for (var i = 0;i < this.allSongs.length ;i++){
      if (song.value == this.allSongs[i].title){
        //found a match,
        console.log("Found a Match");
        
        sId = this.allSongs[i]._id;
        iFound = i;
      }
    }
    if (sId == "none"){
      song.innerText = "SONG NOT FOUND";
      this.errorLineShow("Invalid Song");
      return;
    }
    //check rating
    if(rate.value < 0 || rate.value > 5){
      this.errorLineShow("Invalid Rating");
      return;
    }
    console.log(this.aUser.email);
    let eml = this.aUser.email;
    let body = {
      songId: sId,
      rating: rate.value,
      comment: rev.value,
      submittedBy: eml,
      theSong: this.allSongs[iFound],
      token: this.theToken

    };

    console.log("BODY: ,", body);
    return this.http.makeReview(body,this.theToken).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )


  }

}
