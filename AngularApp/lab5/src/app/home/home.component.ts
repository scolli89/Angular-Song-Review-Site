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
  // used to control the html error messages
  errorMsg: number = 0;
  //reference of the authentication token
  theToken: any;
  clickCounter: number = 0; 
  name: string = '';
  aUser: any;
  // for the administrator to check if the name entereed is valid
  allUsers: any =[];
  // state variables
  userAdmin: boolean = false;
  userActive: boolean = false;
  userSettingsBool: boolean = false;
  
  songMaker: boolean = false;
  reviewMaker: boolean = false;
  //all the songs in the data base
  allSongs: any =[];

  // discontinued for the most part. I could not get them to work the way that i wanted them to.
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
// need to impllement
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
    //  turns on the relevent fields.
    //depending on if the log in button or the register button was pushed, the 
    // displayed element will be different. 
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

    // used to check if the person is logging in or registering based of the 
    //lgn value passed from the html doc.
    // initial email validation
    if (e.value.indexOf("@") == -1 ||e.value.indexOf(".") == -1 || e.value.length <= 5 ){ // email validation 
      console.log("invalid email");
      e.value = "";
      e.placeholder = "ENTER VALID EMAIL";
      return;
    }  
    //password checking
    if (p.value.length <= 2){
      console.log("enter password");
      p.value = "";
      p.placeholder = "enter password";
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
          };
          this.userAdmin = response.isAdmin;
          console.log(this.userAdmin);
          this.theToken = response.t;
          this.userActive = true;
          console.log(this.aUser);
          this.errorLineShow(0);
         // console.log(response.header.get('x-access-token'));
        },
        error => {
          console.log(error.error.text);
          this.errorLineShow(error.error.text);
          this.userActive = false;
          this.userAdmin = false;
          this.userSettingsBool = false;
          this.songMaker = false;
          this.reviewMaker = false;
          
          });

    } else{//registering
      console.log(e.value,p.value);
      //sending the registration request
      this.http.registerUser(e.value,p.value).subscribe(
        response => {
          //this.aUser = response;
          //this.userActive = true;
          //log in those who just registered
          console.log(response);
        },
        error => {
          console.log(error.error);
          this.errorLineShow("already registered");

        }
      )
    }
   
  }
  createSong(){
    
    //making the text areas visible. 
    this.errorLineShow(0);
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
    // hides other elemetns and shows the review elements
    console.log("create reivew");
    this.errorLineShow(0);
    if(this.reviewMaker) {
      this.reviewMaker = false;
      return;
    }
    this.reviewMaker = true;
    if(this.songMaker) this.songMaker = false;
  }

  errorLineShow(msg){
    //this is used to control the error messages displayed on the html page.
    // 0 resets,
    // specific messages sets the state variable which displays the revelvant message.
    if (msg == "Incorrect Email and Password"){
      this.errorMsg = 1;
      this.userActive = false;
          this.userAdmin = false;
          this.userSettingsBool = false;
          this.songMaker = false;
          this.reviewMaker = false;
    } else if(msg == "Your account has been deactivated. Contact admin at ---@admin.com"){
      this.errorMsg = 2;
      this.userActive = false;
          this.userAdmin = false;
          this.userSettingsBool = false;
          this.songMaker = false;
          this.reviewMaker = false;
    } else if(msg == "Invalid Song"){
      this.errorMsg = 3;
    } else if(msg == "Invalid Rating"){
      this.errorMsg = 4;
    } else if(msg == "no Title"){
      this.errorMsg = 5;
    } else if(msg == "no artist"){
      this.errorMsg = 6;
    }else if(msg == "no change"){
      this.errorMsg = 7;
    }else if(msg == "no user"){
      this.errorMsg = 8;
    } else if (msg == "already registered"){
      this.errorMsg = 9;
    }
    
    else {
      this.errorMsg = 0;
    }
  }
  getUser(){
    console.log(this.aUser.email);
    console.log(this.theToken);
  }
 
  makeNewSong(ttl,art,alb,gr,yr,trck,cmm){
    // used to create a new sng
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
      submittedBy: this.aUser.email,
      token:this.theToken
    };
    console.log("body: ", body);
    if (this.theToken == null) return "ERROR no token";
    return this.http.makeSong(body,this.theToken).subscribe(
      response => {
        console.log(response);
        this.errorLineShow(0);
        this.songMaker = false;
      },
      error =>{
        console.log(error);
        this.errorLineShow(0);
        this.songMaker = false;
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
        this.reviewMaker = false;
        this.errorLineShow(0);
      },
      error => {
        console.log(error);
        this.reviewMaker = false;
        this.errorLineShow(0);
      }
    )


  }
  makeChangeSettings(){
    //displayssome admin functions
    this.userSettingsBool = (! this.userSettingsBool);
    if(this.userSettingsBool){
      //get all the users.

      this.getAllUser();
    }
  }
  ChangeUserSettings(user,a,d){
    //allows the admin to make other administartors or deactive current accounts
    this.errorLineShow("")
    this.userSettingsBool = (! this.userSettingsBool);
    if(user.value == "") return this.errorLineShow("no user");
    console.log(user.value,a.value,d.value);
    // setting the intial body to be sent 
    // check for a match, 
    let foundUser = -1
    for (var i = 0 ; i < this.allUsers.length;i++){
      if(user.value == this.allUsers[i].email){
        foundUser = i;
      }
    }
  
    if (foundUser < 0) return this.errorLineShow("no user");

    let body = {
      userId:this.allUsers[foundUser]._id,
      isAdmin: false,
      givenAdmin:false,
      isDeactived: false,
      givenDeactive:false,
      token:this.theToken
    }
    //look for the key words in the text fields.
    if(a.value == "ADMIN"){
      body.isAdmin = true;
      body.givenAdmin = true;
    } else if(a.value == "NOTADMIN"){
      body.isAdmin = false;
      body.givenAdmin = true;
    }
    if(d.value == "STOP"){
      body.isDeactived = true;
      body.givenDeactive = true;
    } else if(d.value == "START"){
      body.isDeactived = false;
      body.givenDeactive = true;
    }
    // if there were no changes, cahnge the error msg line, to show that. return 
    if(!body.givenAdmin && !body.givenDeactive) return this.errorLineShow("no change");
    console.log(body);
    this.http.modifyUser(body).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
  getAllUser(){

    let body = {
      token: this.theToken
    };
    console.log("GET ALL USERS token: ",this.theToken);
    this.http.getallUsers(body).subscribe(
      response =>{
        this.allUsers = response;
        console.log(this.allUsers);
      },
      error => {
        console.log(error);
      }

    )
  }

}
