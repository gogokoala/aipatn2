import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { SF1SearchExp } from '../sf1-search.service';

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.css']
})
export class SimpleSearchComponent implements OnInit {

  searchKeyword: string

  constructor(
    private router: Router,
    private user: UserService,
    private searchExp: SF1SearchExp
  ) { }

  ngOnInit() {
  }

  doSearch() {
    if (this.searchKeyword) {
      const sc = this.searchExp.buildKeySearch(this.searchKeyword)
      this.router.navigate(['/sf1/list'], { queryParams: { sc } });
    }
  }

}
