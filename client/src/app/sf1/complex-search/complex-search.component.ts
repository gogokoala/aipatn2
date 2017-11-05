import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SF1SearchCondition, SF1SearchConditionItem, SF1SearchExp } from '../sf1-search.service';

@Component({
  selector: 'app-complex-search',
  templateUrl: './complex-search.component.html',
  styleUrls: ['./complex-search.component.css']
})


export class ComplexSearchComponent implements OnInit {

  result_num = 0;

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
  };

  dbgroups: any[] = [
    { id: 0, name: '全部数据', sub_types: [] },
    {
      id: 1, name: '中国', sub_types: [
        { id: 1, code: 'FMZL', name: '中国发明专利' },
        { id: 2, code: 'FMSQ', name: '中国发明授权' },
        { id: 3, code: 'SYXX', name: '中国实用新型' },
        { id: 4, code: 'WGZL', name: '中国外观专利' },
        { id: 5, code: 'TWZL', name: '台湾' },
        { id: 6, code: 'HKPATENT', name: '香港' },
      ]
    },
    {
      id: 2, name: '主要国家和组织', sub_types: [
        { id: 1, code: 'USPATENT', name: '美国' },
        { id: 2, code: 'GBPATENT', name: '英国' },
        { id: 3, code: 'FRPATENT', name: '法国' },
        { id: 4, code: 'DEPATENT', name: '德国' },
        { id: 5, code: 'CHPATENT', name: '瑞士' },
        { id: 6, code: 'JPPATENT', name: '日本' },
        { id: 7, code: 'RUPATENT', name: '俄罗斯' },
        { id: 8, code: 'KRPATENT', name: '韩国' },
        { id: 9, code: 'EPPATENT', name: '欧洲专利局(EPO)' },
        { id: 10, code: 'WOPATENT', name: '世界知识产权组织(WIPO)' },
      ]
    },
    {
      id: 3, name: '其它国家和地区', sub_types: [
        { id: 1, code: 'GCPATENT', name: '阿拉伯' },
        { id: 2, code: 'AUPATENT', name: '澳大利亚' },
        { id: 3, code: 'CAPATENT', name: '加拿大' },
        { id: 4, code: 'ESPATENT', name: '西班牙' },
        { id: 5, code: 'ATPATENT', name: '奥地利' },
        { id: 6, code: 'ITPATENT', name: '意大利' },
        { id: 7, code: 'APPATENT', name: '非洲地址' },
        { id: 8, code: 'SEPATENT', name: '瑞典' },
        { id: 9, code: 'ASPATENT', name: '东南亚' },
        { id: 10, code: 'OTHERPATENT', name: '更多其它国家' },
      ]
    },
  ];

  exp = new SF1SearchExp();

  constructor(private router: Router) {

    const k: any[] = [
      { id: 1, name: ['名称', '摘要', '权利要求书', '说明书'], title: '所有字段' },
      { id: 2, name: ['名称', '摘要'], title: '专利名称/摘要' },
      { id: 3, name: ['名称', '摘要', '权利要求书'], title: '专利名称/摘要/权利要求' },
      { id: 4, name: ['名称'], title: '专利名称' },
      { id: 5, name: ['摘要'], title: '摘要' },
      { id: 6, name: ['权利要求书'], title: '权利要求' },
      { id: 8, name: ['说明书'], title: '说明书' },
    ];
    this.exp.initKeyGroup(k);

    const c: any[] = [
      { id: 1, name: ['申请号'], title: '申请号' },
      { id: 2, name: ['公开（公告）号'], title: '公开（公告）号' },
      { id: 3, name: ['优先权'], title: '优先权号' },
    ];
    this.exp.initCodeGroup(c);

    const t: any[] = [
      { id: 1, name: ['分类号'], title: '国际分类号（IPC）' },
      // { id: 2, name: [], title: '外观分类(Locarno)' },
    ];
    this.exp.initTypeGroup(t);

    const n: any[] = [
      { id: 1, name: ['申请（专利权）人'], title: '申请（专利权）人' },
      // { id: 2, name: [], title: '当前专利权人' },
      // { id: 3, name: [], title: '股票代码' },
      { id: 4, name: ['发明（设计）人'], title: '发明人' },
      { id: 5, name: ['代理人'], title: '代理人' },
      { id: 6, name: ['专利代理机构'], title: '代理机构' },
      { id: 8, name: ['地址'], title: '申请人地址' },
    ];
    this.exp.initNameGroup(n);

    const d: any[] = [
      { id: 1, name: ['申请日'], title: '申请日' },
      { id: 2, name: ['公开（公告）日'], title: '公开（公告）日' },
      { id: 3, name: ['优先权日'], title: '授权日' },
    ];
    this.exp.initDateGroup(d);
  }

  ngOnInit() {

  }

  doSearch() {
    const link = ['/sf1/search'];
    this.router.navigate(link);
  }

  // valToString(){
  //   let v='';
  //   v = JSON.stringify(this.key_group);
  //   return v;
  // }
}
