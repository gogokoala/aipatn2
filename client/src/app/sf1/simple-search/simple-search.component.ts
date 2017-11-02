import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.css']
})
export class SimpleSearchComponent implements OnInit {

  searchKeyword: string

  constructor(private router: Router) { }

  ngOnInit() {
  }

  doSearch() {
    if (this.searchKeyword) {
      this.router.navigate(['/sf1/search'], { queryParams: { kw: this.searchKeyword } });
    }
  }

}
