import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import { SF1SearchExp } from '../sf1-search.service';

@Component({
  selector: 'app-complex-search',
  templateUrl: './complex-search.component.html',
  styleUrls: ['./complex-search.component.css']
})


export class ComplexSearchComponent implements OnInit {

  result_num = 0

  cn: any = {
    /** 每周第一天，0代表周日 */
    firstDayOfWeek: 0,
    /** 每周天数正常样式 */
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    /** 每周天数短样式（位置较小时显示） */
    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    /** 每周天数最小样式 */
    dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
    /** 每月月份正常样式 */
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    /**每月月份短样式 */
    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  }

  exp: SF1SearchExp

  constructor(
    private router: Router,
    private user: UserService,
    private sf1Exp: SF1SearchExp
  ) {
    this.exp = sf1Exp
  }

  ngOnInit() {
  }

  doSearch() {
    const k = this.exp.getKeyWords();
    console.log(k);

    // const link = ['/sf1/search']
    // this.router.navigate(link)
  }
}
