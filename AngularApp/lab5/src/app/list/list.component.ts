import { Component, OnInit } from '@angular/core';
//import { HttpService } from '../http.service';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  brews: Object;


  constructor(private _http: HttpService) { }

  ngOnInit() {// runs when the componenet is loaded
    console.log("init");
    this._http.myMethod();  
    this._http.getbeer().subscribe(data => {
      this.brews = data;
      console.log(this.brews);
      
    })


  }

}
