import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oauth2-callback',
  templateUrl: './oauth2-callback.component.html',
  styleUrls: ['./oauth2-callback.component.css']
})
export class OAuth2CallbackComponent implements OnInit {

  data: string;

  constructor() { }

  ngOnInit() {
    
  }

}
