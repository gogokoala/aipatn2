import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pat-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {
  key_word: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  doSearch(): void {
    let link = ['/pat-search'];
    this.router.navigate(link);
  }

}
