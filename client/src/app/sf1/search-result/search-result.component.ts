import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  filter_items: any[] = [
    {id: 1, name: '国家'},
    {id: 2, name: '申请人'},
    {id: 3, name: '申请日'},
    {id: 4, name: '公开日'},
    {id: 5, name: '授权日'},
    {id: 6, name: '法律状态'},
    {id: 7, name: '法律事件'},
    {id: 8, name: '分类号:大类'},
    {id: 9, name: '分类号:小类'},
    {id: 10, name: '分类号:大组'},
    {id: 11, name: '分类号:大组'},
    {id: 12, name: '外观分类'},
    {id: 13, name: '发明人'},
    {id: 14, name: '代理机构'},
    {id: 15, name: '代理人'},
  ]

  searchKeyword: Observable<string>

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.searchKeyword = this.route.queryParamMap.map(params => params.get('kw') || 'None');
  }

}
