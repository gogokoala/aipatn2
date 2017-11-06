import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { SF1Service, SF1Response } from '../sf1.service'

@Component({
  selector: 'app-sf1-list',
  templateUrl: './sf1-list.component.html',
  styleUrls: ['./sf1-list.component.css']
})
export class SF1ListComponent implements OnInit {

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
  sf1: SF1Response

  constructor(
    private route: ActivatedRoute,
    private service: SF1Service
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { crisis: SF1Response }) => {
      console.log(data.crisis)
      this.sf1 = data.crisis;
      console.log(this.sf1)
    })
  }

  getDbName(code: string) {
    const db = this.service.getDatabase(code)
    if (db) {
      return db.name
    }
    return ''
  }
}
